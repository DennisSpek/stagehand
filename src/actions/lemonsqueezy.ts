'use server';

import {
  lemonSqueezySetup,
  cancelSubscription,
  createCheckout,
  createWebhook,
  getPrice,
  getProduct,
  getSubscription,
  listPrices,
  listProducts,
  listWebhooks,
  updateSubscription,
  type ListProducts,
  type ListProductsParams,
} from '@lemonsqueezy/lemonsqueezy.js';
import { auth } from '@/auth';

interface detailsArray {
  name: string;
  artists: number;
  tracks: number;
  features: string[];
  trial: boolean;
}

const detailsArray: detailsArray[] = [
  {
    name: 'Artist Plan',
    artists: 1,
    tracks: 20,
    features: ['Connect 1 artist', 'Track 20 songs', 'Weekly notifications'],
    trial: true,
  },
  {
    name: 'Small Teams',
    artists: 10,
    tracks: 200,
    features: [
      'Connect 10 artists',
      'track 200 songs',
      'Weekly notifications',
      'Audience reports',
    ],
    trial: false,
  },
  {
    name: 'Bigger Teams',
    artists: 50,
    tracks: 1000,
    features: [
      'Connect 50 artists',
      'Track 1000 songs',
      'Daily notifications',
      'Audience reports',
      'Multi-user access',
    ],
    trial: false,
  },
];

interface Variant {
  id: string;
  attributes: {
    name: string;
    description: string;
    price: string;
    interval: string;
    slug: string;
  };
}

const storeId = process.env.LEMONSQUEEZY_STORE_ID || '';
const apiKey = process.env.LEMONSQUEEZY_API_KEY || '';

function configureLemonSqueezy() {
  lemonSqueezySetup({
    apiKey: apiKey,
    onError: (error) => {
      throw new Error(`Lemon Squeezy API error: ${error.message}`);
    },
  });
}

export async function getProducts(): Promise<Plan[]> {
  configureLemonSqueezy();

  const { statusCode, error, data } = await listProducts({
    filter: { storeId: storeId },
    include: ['variants'],
  });

  if (statusCode !== 200) {
    throw new Error(`Failed to fetch products: ${error?.message}`);
  }

  if (!data) {
    throw new Error('No data returned from listProducts');
  }

  const { data: products, included: variants } = data;

  const productArray = products.map((product) => {
    const { name, description, from_price_formatted, to_price_formatted } =
      product.attributes;
    const url = 'https://stagehand.lemonsqueezy.com/checkout/buy';
    const details = detailsArray.find((detail) => detail.name === name);

    if (!details) {
      throw new Error(`Details not found for product: ${name}`);
    }

    const variantsArray =
      variants
        ?.filter((variant) =>
          product.relationships?.variants?.data?.some(
            ({ id }) => variant.id === id
          )
        )
        .map((variant) => ({
          id: variant.id,
          name: variant.attributes.name as string,
          description: variant.attributes.description as string,
          price: variant.attributes.price as string,
          interval: variant.attributes.interval as string,
          url: `${url}/${variant.attributes.slug}`,
        })) || [];

    return {
      id: product.id,
      price: {
        monthly: from_price_formatted
          ? from_price_formatted.replace(/\.00$/, '')
          : '',
        yearly: to_price_formatted
          ? to_price_formatted.replace(/\.00$/, '')
          : '',
      },
      ...details,
      description: description.replace(/<p>/g, '').replace(/<\/p>/g, ''),
      variants: variantsArray,
    };
  });

  return productArray;
}

interface checkoutData {
  name: string;
  billing_address: {
    country: string;
    zip: string;
  };
}

export async function getCheckoutURL(
  variantId: number,
  checkoutData: checkoutData
): Promise<string | null> {
  configureLemonSqueezy();

  const session = await auth();

  if (!session?.user) {
    throw new Error('User is not authenticated.');
  }

  try {
    const checkout = await createCheckout(storeId, variantId, {
      checkoutOptions: {
        embed: true,
        media: false,
        logo: true,
      },
      checkoutData: {
        email: session.user.email ?? undefined,
        ...checkoutData,
      },
      productOptions: {
        enabledVariants: [variantId],
        receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
      },
    });

    return checkout.data?.data.attributes.url ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//Use this function to determine if a user is still subscribed
export async function verifySubscription(): Promise<boolean> {
  configureLemonSqueezy();

  const session = await auth();

  if (!session?.user) {
    throw new Error('User is not authenticated.');
  }

  const subscriptionId = session?.user?.billing?.billingPlan?.subscription_id;

  if (!subscriptionId) return false;

  const { data: subscription } = await getSubscription(subscriptionId);

  if (!subscription || subscription?.data?.attributes?.status !== 'active') {
    return false;
  }

  return true;
}

// export async function getSubscriptionWith(id: string): Promise<void> {
//   configureLemonSqueezy();

//   const session = await auth();

//   if (!session?.user) {
//     throw new Error("User is not authenticated.");
//   }

//   const subscription = await getSubscription(id);

//   return subscription;
// }
