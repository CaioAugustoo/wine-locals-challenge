import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

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
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
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
});
