import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { DishesService } from './dishes.service';
import { RedisDishesRepository } from './redis.repository';

describe('DishesService', () => {
  let dishesService: DishesService;
  let redisDishesRepository: RedisDishesRepository;
  let restaurantsService: RestaurantsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DishesService,
        {
          provide: RedisDishesRepository,
          useValue: {
            listAll: jest.fn(),
          },
        },
        {
          provide: RestaurantsService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    dishesService = module.get<DishesService>(DishesService);
    redisDishesRepository = module.get<RedisDishesRepository>(
      RedisDishesRepository,
    );
    restaurantsService = module.get<RestaurantsService>(RestaurantsService);
  });

  describe('listAll', () => {
    it('should throw an error if restaurantId is not provided', async () => {
      await expect(dishesService.listAll(null)).rejects.toThrow(
        new HttpException('Restaurant ID is required', HttpStatus.BAD_REQUEST),
      );
    });

    it('should call restaurantsService.findById', async () => {
      const restaurantId = 'restaurantId';

      await dishesService.listAll(restaurantId);

      expect(restaurantsService.findById).toHaveBeenCalledWith(restaurantId);
    });

    it('should call redisDishesRepository.listAll', async () => {
      const restaurantId = 'restaurantId';

      await dishesService.listAll(restaurantId);

      expect(redisDishesRepository.listAll).toHaveBeenCalledWith(restaurantId);
    });
  });
});
