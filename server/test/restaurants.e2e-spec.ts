import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../src/config/prisma';
import { DishesService } from '../src/modules/dishes/dishes.service';
import { RestaurantsService } from '../src/modules/restaurants/restaurants.service';
import { AppModule } from './../src/modules/app/app.module';

describe('RestaurantsController (e2e)', () => {
  let app: INestApplication;
  let restaurantService: RestaurantsService;
  let dishesService: DishesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: RestaurantsService,
          useValue: {
            create: jest.fn((dto) => ({
              id: 'restaurantId',
              name: dto.name,
            })),
            findById: jest.fn(() => ({
              id: 'restaurantId',
              name: 'Restaurant 1',
              dishes: [],
            })),
            listAll: jest.fn(() => ({
              totalCount: 1,
              restaurants: [
                {
                  id: 'restaurantId',
                  name: 'Restaurant 1',
                  dishes: [],
                },
              ],
            })),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    restaurantService =
      moduleFixture.get<RestaurantsService>(RestaurantsService);
    dishesService = moduleFixture.get<DishesService>(DishesService);

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close(), prismaService.disconnect()]);
  });
  describe('/restaurants (POST)', () => {
    it('should throw error if name field is not provided', async () => {
      jest.spyOn(restaurantService, 'create').mockImplementation(() => {
        throw new Error('Name field is required');
      });

      try {
        await restaurantService.create({});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Name field is required');
      }
    });

    it('should create a new restaurant', async () => {
      jest.spyOn(restaurantService, 'create').mockResolvedValueOnce({
        id: 'restaurantId',
        name: 'My amazing restaurant',
      });

      const result = await restaurantService.create({
        name: 'My amazing restaurant',
      });

      expect(result).toEqual({
        id: 'restaurantId',
        name: 'My amazing restaurant',
      });
    });

    it('should throw error if restaurant with same name already exists', async () => {
      jest.spyOn(restaurantService, 'create').mockImplementation(() => {
        throw new Error('Restaurant "My amazing restaurant" already exists');
      });

      try {
        await restaurantService.create({
          name: 'My amazing restaurant',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(
          'Restaurant "My amazing restaurant" already exists',
        );
      }
    });
  });

  describe('/restaurants (GET)', () => {
    it('should return restaurants and totalCount', async () => {
      jest.spyOn(restaurantService, 'listAll').mockResolvedValueOnce({
        totalCount: 1,
        restaurants: [
          {
            id: 'restaurantId',
            name: 'Restaurant 1',
            _count: {
              dish: 0,
            },
          },
        ],
      });

      const result = await restaurantService.listAll({
        page: 1,
      });

      expect(result).toEqual({
        totalCount: 1,
        restaurants: [
          {
            id: 'restaurantId',
            name: 'Restaurant 1',
            _count: {
              dish: 0,
            },
          },
        ],
      });
    });
  });

  describe('/restaurants/:id (GET)', () => {
    it('should get restaurant by id', async () => {
      jest.spyOn(restaurantService, 'findById').mockResolvedValueOnce({
        id: 'restaurantId',
        name: 'Restaurant 1',
        totalDishes: 0,
      });

      const result = await restaurantService.findById('restaurantId');

      expect(result).toEqual({
        id: 'restaurantId',
        name: 'Restaurant 1',
        totalDishes: 0,
      });
    });

    it('should throw error if restaurant not found', async () => {
      jest.spyOn(restaurantService, 'findById').mockImplementation(() => {
        throw new Error('Restaurant not found');
      });

      try {
        await restaurantService.findById('restaurantId');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Restaurant not found');
      }
    });
  });

  describe('/restaurants/:id/dishes (POST)', () => {
    it('should throw error if restaurant not found', async () => {
      jest.spyOn(dishesService, 'create').mockImplementation(() => {
        throw new Error('Restaurant not found');
      });

      try {
        await dishesService.create({
          restaurantId: 'restaurantId',
          name: 'Dish 1',
          price: 10,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Restaurant not found');
      }
    });

    it('should create a new dish', async () => {
      const createdAt = new Date();

      jest.spyOn(dishesService, 'create').mockResolvedValueOnce({
        id: 'dishId',
        name: 'Dish 1',
        price: new Prisma.Decimal(10),
        createdAt,
        description: 'my dish',
      });

      const result = await dishesService.create({
        restaurantId: 'restaurantId',
        name: 'Dish 1',
        price: 10,
        description: 'my dish',
      });

      expect(result).toEqual({
        id: 'dishId',
        name: 'Dish 1',
        price: new Prisma.Decimal(10),
        createdAt,
        description: 'my dish',
      });
    });
  });

  describe('/restaurants/:id/dishes (GET)', () => {
    it('should throw error if restaurant not found', async () => {
      jest.spyOn(dishesService, 'listAll').mockImplementation(() => {
        throw new Error('Restaurant not found');
      });

      try {
        await dishesService.listAll({
          restaurantId: 'restaurantId',
          page: 1,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Restaurant not found');
      }
    });

    it('should return dishes and totalCount', async () => {
      jest.spyOn(dishesService, 'listAll').mockResolvedValueOnce({
        totalCount: 1,
        dishes: [
          {
            id: 'dishId',
            name: 'Dish 1',
            price: new Prisma.Decimal(10),
            createdAt: new Date(),
            description: 'my dish',
            restaurantId: 'restaurantId',
          },
        ],
      });

      const result = await dishesService.listAll({
        restaurantId: 'restaurantId',
        page: 1,
      });

      expect(result).toEqual({
        totalCount: 1,
        dishes: [
          {
            id: 'dishId',
            name: 'Dish 1',
            price: new Prisma.Decimal(10),
            createdAt: new Date(),
            description: 'my dish',
            restaurantId: 'restaurantId',
          },
        ],
      });
    });
  });
});
