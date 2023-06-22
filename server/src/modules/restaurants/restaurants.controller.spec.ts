import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { createDishDtoMock } from '../../shared/mocks/dishes';
import { DishesService } from '../dishes/dishes.service';
import { PaginatedDishesDtoOutput } from '../dishes/dto/list-all-dishes.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;
  let dishesService: DishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: {
            create: jest.fn(() =>
              Promise.resolve({ id: randomUUID(), name: 'Restaurant 1' }),
            ),
            alreadyExistsRestaurantWithSameName: jest.fn(() =>
              Promise.resolve(false),
            ),
            findById: jest.fn(() =>
              Promise.resolve({
                id: randomUUID(),
                name: 'Restaurant 1',
                dishes: [],
              }),
            ),
          },
        },
        {
          provide: DishesService,
          useValue: {
            listAll: jest.fn(() => Promise.resolve([])),
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
    dishesService = module.get<DishesService>(DishesService);
  });

  describe('create', () => {
    const createRestaurantDto: CreateRestaurantDto = {
      name: 'Restaurant 1',
    };

    it('should return a restaurant with id and name fields', async () => {
      const createdRestaurant = await controller.create(createRestaurantDto);

      expect(createdRestaurant.data.id).toBeDefined();
      expect(createdRestaurant.data.name).toEqual(createRestaurantDto.name);
    });

    it("should throw an error if the restaurant's name already exists", async () => {
      jest
        .spyOn(service, 'alreadyExistsRestaurantWithSameName')
        .mockResolvedValue(true);

      try {
        await controller.create(createRestaurantDto);
      } catch (err) {
        expect(err.message).toEqual('Restaurant "Restaurant 1" already exists');
        expect(err.status).toEqual(400);
      }
    });
  });

  describe('findById', () => {
    it('should return a restaurant correctly', async () => {
      const restaurantId = randomUUID();

      const foundRestaurant = await controller.findById({ id: restaurantId });

      expect(foundRestaurant.data.id).toBeDefined();
      expect(foundRestaurant.data.name).toBeDefined();
    });

    it('should catch error if restaurant does not exist', async () => {
      jest.spyOn(service, 'findById').mockImplementation(() => {
        throw new Error('Restaurant not found');
      });

      try {
        await controller.findById({ id: randomUUID() });
      } catch (err) {
        expect(err.message).toEqual('Restaurant not found');
      }
    });
  });

  describe('listAllDishes', () => {
    it('should return a list of dishes', async () => {
      const restaurantId = randomUUID();

      const params = {
        id: restaurantId,
      };

      const query = {
        limit: 10,
        page: 1,
      };

      const dishes = await controller.listAllDishes(params, query);

      expect(dishes.data).toEqual([]);
    });

    it("should paginate dishes if 'page' query param is provided", async () => {
      const dishes = createDishDtoMock(10);

      let output: PaginatedDishesDtoOutput = {
        dishes: dishes,
        totalCount: dishes.length,
      };

      jest.spyOn(dishesService, 'listAll').mockResolvedValueOnce(output);

      const restaurantId = randomUUID();

      const params = {
        id: restaurantId,
      };

      const query = {
        page: 1,
      };

      let response = await controller.listAllDishes(params, query);

      expect(response.data).toEqual(output);

      output = {
        dishes: [],
        totalCount: dishes.length + 1,
      };

      query.page = 21;

      jest.spyOn(dishesService, 'listAll').mockResolvedValueOnce(output);

      response = await controller.listAllDishes(params, query);

      expect(response.data.dishes).toHaveLength(0);
    });
  });
});
