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
            countTotal: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: RestaurantsService,
          useValue: {
            findById: jest.fn(() => ({
              id: 'restaurantId',
              name: 'Restaurant 1',
              dishes: [],
            })),
          },
        },
      ],
    }).compile();

    restaurantsService = module.get<RestaurantsService>(RestaurantsService);
    dishesService = module.get<DishesService>(DishesService);
    redisDishesRepository = module.get<RedisDishesRepository>(
      RedisDishesRepository,
    );
  });

  describe('listAll', () => {
    it('should throw an error if restaurantId is not provided', async () => {
      await expect(dishesService.listAll(null)).rejects.toThrow(
        new HttpException('Restaurant ID is required', HttpStatus.BAD_REQUEST),
      );
    });

    it('should return dishes and totalCount', async () => {
      const listAllSpy = jest
        .spyOn(redisDishesRepository, 'listAll')
        .mockResolvedValueOnce([]);

      const countTotalSpy = jest
        .spyOn(redisDishesRepository, 'countTotal')
        .mockResolvedValueOnce(0);

      const result = await dishesService.listAll({ restaurantId: 'id' });

      expect(listAllSpy).toHaveBeenCalledWith({ restaurantId: 'id' });
      expect(countTotalSpy).toHaveBeenCalledWith('id');
      expect(result).toEqual({ dishes: [], totalCount: 0 });
    });
  });

  describe('create', () => {
    it('should throw an error if payload is invalid', async () => {
      try {
        await dishesService.create({});
      } catch (err) {
        expect(err.message).toEqual("The 'name' field is required.");
      }
    });

    it('should throw an error if restaurant does not exist', async () => {
      jest.spyOn(restaurantsService, 'findById').mockResolvedValueOnce(null);

      try {
        await dishesService.create({
          name: 'Dish 1',
          restaurantId: 'restaurantId',
          description: 'Dish 1 description',
          price: 10,
        });
      } catch (err) {
        expect(err.message).toEqual('Restaurant not found');
      }
    });
  });
});
