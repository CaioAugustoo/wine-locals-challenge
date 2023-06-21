import { Injectable } from '@nestjs/common';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
  createRestaurantDtoSchema,
} from './dto/create-restaurant.dto';

import { RestaurantsRepository } from './restaurants.repository';

import { HttpException } from '../../shared/exceptions';
import { Zod } from '../../shared/utils/zod/validations';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  public async create(
    createRestaurantDto: CreateRestaurantDto,
  ): CreateRestaurantDtoOutput {
    const payload = Zod.parseAndValidate(
      createRestaurantDtoSchema,
      createRestaurantDto,
    );

    const alreadyExistsRestaurant =
      await this.alreadyExistsRestaurantWithSameName(payload.name);

    if (alreadyExistsRestaurant) {
      throw new HttpException(`Restaurant ${payload.name} already exists`, 400);
    }

    return this.restaurantsRepository.create(payload);
  }

  private async alreadyExistsRestaurantWithSameName(
    name: string,
  ): Promise<boolean> {
    const restaurant = await this.restaurantsRepository.findByName(name);

    if (!restaurant) {
      return false;
    }

    return restaurant.name === name;
  }
}
