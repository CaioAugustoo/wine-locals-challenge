import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from '../dto/create-restaurant.dto';
import { FindRestaurantByIdOutput } from '../dto/find-restaurant-by-id.dto';

export interface IRestaurantsRepository {
  create(dto: CreateRestaurantDto): Promise<CreateRestaurantDtoOutput>;
  findByName(name: string): Promise<CreateRestaurantDtoOutput>;
  findById(id: string): Promise<FindRestaurantByIdOutput>;
}
