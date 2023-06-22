export const GET_RESTAURANT_DISHES_CACHE_KEY = (restaurantId: string): string =>
  `restaurants:${restaurantId}-dishes`;

export const GET_RESTAURANTS_CACHE_KEY = (value: string) =>
  `restaurants:${value}`;
