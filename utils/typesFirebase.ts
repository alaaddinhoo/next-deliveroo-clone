export interface Restaurant {
  id: string;
  name: string;
  coverImage: string;
  onlyOnDeliveroo: boolean;
  deliveryFee?: number;
  rating?: number;
  // Add other properties as needed
}
