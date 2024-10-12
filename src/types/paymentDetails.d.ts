export interface PaymentDetails {
  email: string;
  full_name: string;
  address: string;
  address_apt?: string;
  address_country: string;
  address_state?: string;
  address_city: string;
  address_zip: string;
  tax_id?: string;
  discount_code?: string;
}