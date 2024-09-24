export interface Plan {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  artists: number;
  tracks: number;
  features: string[];
  description: string;
  trial: boolean;
}