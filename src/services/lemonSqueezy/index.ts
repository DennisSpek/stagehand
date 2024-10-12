'use server'

import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { Variant } from '@/types/lemonSqueezy/packageVariant';

interface detailsArray {
  artists: number;
  tracks: number;
  features: string[];
  trial: boolean;
}

const detailsArray: detailsArray[] = [
  {
    artists: 1,
    tracks: 20,
    features: [
      'Connect 1 artist',
      'Track 20 songs',
      'Weekly notifications',
    ],
    trial: true,
  },
  {
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
  }
]

export const getProducts = async (): Promise<Plan[] | []> => {
  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'authorization': `Bearer ${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY}`
      },
    });

    const data = await response.json();

    if(!response.ok) return [];

    const products: Plan[] = [];

    data.data.forEach((product: unknown, index: number) => {
      const { id, attributes } = product;
      const { name, from_price_formatted, to_price_formatted, description } = attributes;

      products.push({
        id,
        name,
        price: {
          monthly: from_price_formatted.replace(/\.00$/, ''),
          yearly: to_price_formatted.replace(/\.00$/, ''),
        },
        ...detailsArray[index],
        description: description.replace(/<p>/g, '').replace(/<\/p>/g, ''),
      });
    });

    return products;
  } catch(e) {
    console.error(e);
  }
};

export const getProductVariants = async (id: string): Promise<Variant[] | []> => {
  try {
    const response = await fetch(`https://api.lemonsqueezy.com/v1/products/${id}/variants`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'authorization': `Bearer ${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY}`
      },
    });

    const data = await response.json();

    if(!response.ok) return [];

    const filteredData: Variant[] = data.data.filter(item => item.attributes.status !== 'pending').map((item: unknown) => {
      const { id, attributes } = item;
      const { interval } = attributes;

      return {
        id: id,
        name: attributes.name,
        description: attributes.description,
        price: attributes.price,
        interval: attributes.interval,
      }
    });

    return filteredData;
  } catch(e) {
    console.error(e);
  }
};