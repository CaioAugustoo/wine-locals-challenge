import { ListDishesDto } from 'src/modules/dishes/dto/list-all-dishes.dto';
import { DEFAULT_PAGINATION_PAGE } from './pagination';

export const GET_RESTAURANT_DISHES_CACHE_KEY = ({
  restaurantId,
  page = DEFAULT_PAGINATION_PAGE,
}: ListDishesDto): string => `restaurants:${restaurantId}-dishes-${page}`;

export const GET_TOTAL_DISHES_CACHE_KEY = (restaurantId: string) =>
  `restaurants:${restaurantId}-dishes-total`;

export const GET_RESTAURANTS_CACHE_KEY = (value: string) =>
  `restaurants:${value}`;

export const REDIS_TTL_IN_SECONDS = Number(
  process.env.REDIS_TTL_IN_SECONDS ?? 60,
);
