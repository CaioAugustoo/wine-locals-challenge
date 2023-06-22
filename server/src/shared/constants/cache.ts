import { ListDishesDto } from 'src/modules/dishes/dto/list-all-dishes.dto';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from './pagination';

export const GET_RESTAURANT_DISHES_CACHE_KEY = ({
  restaurantId,
  limit = DEFAULT_PAGINATION_LIMIT,
  page = DEFAULT_PAGINATION_PAGE,
}: ListDishesDto): string =>
  `restaurants:${restaurantId}-dishes-${limit}-${page}`;

export const GET_TOTAL_DISHES_CACHE_KEY = (restaurantId: string) =>
  `restaurants:${restaurantId}-dishes-total`;

export const GET_RESTAURANTS_CACHE_KEY = (value: string) =>
  `restaurants:${value}`;
