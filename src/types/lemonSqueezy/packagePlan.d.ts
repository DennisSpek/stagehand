type Plan = {
  id: string;
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
  artists: number;
  tracks: number;
  features: string[];
  description: string;
  trial: boolean;
  variants: Variant[];
};
