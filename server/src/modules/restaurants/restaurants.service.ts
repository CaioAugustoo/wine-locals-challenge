import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
  createRestaurantDtoSchema,
} from './dto/create-restaurant.dto';

import { HttpException } from '../../shared/exceptions';
import { Zod } from '../../shared/utils/zod/validations';
import { RedisRestaurantRepository } from './redis.repository';

@Injectable()
export class RestaurantsService {
  public constructor(
    private readonly redisRestaurantRepository: RedisRestaurantRepository,
  ) {}

  public async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantDtoOutput> {
    const payload = Zod.parseAndValidate(
      createRestaurantDtoSchema,
      createRestaurantDto,
    );

    const alreadyExistsRestaurant =
      await this.alreadyExistsRestaurantWithSameName(payload.name);

    if (alreadyExistsRestaurant) {
      throw new HttpException(
        `Restaurant "${payload.name}" already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.redisRestaurantRepository.create(payload);
  }

  private async alreadyExistsRestaurantWithSameName(
    name: string,
  ): Promise<boolean> {
    const restaurant = await this.redisRestaurantRepository.findByName(name);

    if (!restaurant) {
      return false;
    }

    return restaurant.name === name;
  }
}
