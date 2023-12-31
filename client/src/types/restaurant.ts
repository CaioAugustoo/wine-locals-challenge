export interface Restaurant {
  id: string;
  name: string;
  description: string;
}

export interface FeedRestaurant extends Omit<Restaurant, "description"> {
  _count: {
    dish: number;
  };
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
}
