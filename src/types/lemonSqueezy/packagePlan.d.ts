export interface Plan {
  id: number;
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