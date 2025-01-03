type BillingDetails = {
  full_name: string;
  address: string;
  address_apt?: string;
  address_country: string;
  address_state?: string;
  address_city: string;
  address_zip: string;
};

type BillingPlan = {
  subscription_id: string;
  subscription_status: string;
  product_id: string;
  product_name: string;
  variant_id: string;
  description: string;
  price: string;
  interval: string;
  trial: boolean;
  trial_end: Date;
  purchase_url: string;
};

type BillingProfile = {
  user: UserType | undefined;
  customer_id?: string;
  billingPlan: BillingPlan;
  billingDetails: BillingDetails;
};
