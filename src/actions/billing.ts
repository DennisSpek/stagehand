'use server'

import { BillingProfile, BillingPlan, BillingDetails } from '@/types/billing';
import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { Variant } from '@/types/lemonSqueezy/packageVariant';
import { auth } from "@/auth";

const userServiceUrl = process.env.NEXT_PUBLIC_STAGEHAND_USER_SERVICE_URL;

export const createBillingProfile = async (selectedPlan: Plan, selectedVariant: Variant, paymentDetails: BillingDetails, paymentResult: any): Promise<BillingProfile | null> => {
  try {

    const session = await auth();

    const billing: BillingProfile = {
      user: session?.user,
      customer_id: paymentResult?.attributes?.customer_id,
      billingPlan: {
        subscription_id: paymentResult?.id,
        subscription_status: 'active',
        product_id: selectedPlan.id,
        product_name: selectedPlan.name,
        variant_id: selectedVariant.id,
        description: selectedVariant.description,
        price: selectedVariant.price,
        interval: selectedVariant.interval,
        trial: selectedPlan.trial,
        trial_end: selectedPlan.trial ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : new Date(),
        purchase_url: selectedVariant.url,
      },
      billingDetails: paymentDetails
    }

    const response = await fetch(`${userServiceUrl}/billing/create`, {
      method: 'POST',
      body: JSON.stringify(billing),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update artist list');
    }

    const data = await response.json();

    console.log("data", data);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBillingProfile = async (id: string): Promise<BillingProfile | void> => {};

export const updateBillingProfile = async (id: string, billingProfile: BillingProfile): Promise<BillingProfile | null> => {
  try {
    const body = {
      userId: id,
      billingData: billingProfile,
    };

    console.log("body", body);

    const response = await fetch(`${userServiceUrl}/billing/update`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update artist list');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};