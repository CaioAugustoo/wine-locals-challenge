import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from '../dto/create-restaurant.dto';

export interface IRestaurantsRepository {
  create(dto: CreateRestaurantDto): CreateRestaurantDtoOutput;
}
