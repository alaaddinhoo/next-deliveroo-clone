export interface Restaurant {
  id: string;
  objectID: string;
  name: string;
  coverImage: string;
  onlyOnDeliveroo: boolean;
  deliveryFee?: number;
  rating?: number;
  // Add other properties as needed
}

export interface RestaurantMenu {
  restaurantID: string;
  categories: Category[];
}

export interface Category {
  name: string;
  description: string;
  items: Item[];
}

export interface Item {
  name: string;
  image: string;
  subTitle: string;
  description: string;
  price: number;
  addons: Addon[];
}

export interface Addon {
  title: string;
  items: AddonItem[];
}

export interface AddonItem {
  name: string;
  type: "choice" | "remove";
  price?: number;
}

export interface CartItem {
  restaurantID: string;
  category: string;
  name: string;
  image: string;
  subTitle: string;
  description: string;
  price: number;
  quantity: number;
  addons: Array<{
    title: string;
    items: Array<{
      name: string;
      type: string;
      price?: number; // Optional, since "remove" type doesn't have a price
    }>;
  }>;
}
