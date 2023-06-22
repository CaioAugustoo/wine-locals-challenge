import { Test, TestingModule } from '@nestjs/testing';
import { RedisDishesRepository } from '../dishes/redis.repository';
import {
  CreateRestaurantDto,
  CreateRestaurantDtoOutput,
} from './dto/create-restaurant.dto';
import { RedisRestaurantRepository } from './redis.repository';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: RedisRestaurantRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: RedisRestaurantRepository,
          useValue: {
            create: jest.fn(),
            findByName: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: RedisDishesRepository,
          useValue: {
            countTotal: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<RedisRestaurantRepository>(
      RedisRestaurantRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createRestaurantDto: CreateRestaurantDto = {
      name: 'Restaurant 1',
    };

    const createRestaurantDtoOutput: CreateRestaurantDtoOutput = {
      id: '1',
      name: 'Restaurant 1',
    };

    it('should return a restaurant with id and name fields', async () => {
      jest.spyOn(repository, 'findByName').mockResolvedValue(null);
      jest
        .spyOn(repository, 'create')
        .mockResolvedValue(createRestaurantDtoOutput);

      expect(await service.create(createRestaurantDto)).toEqual(
        createRestaurantDtoOutput,
      );
    });

    it("should throw an error if the restaurant's name already exists", async () => {
      jest
        .spyOn(repository, 'findByName')
        .mockResolvedValue(createRestaurantDtoOutput);

      try {
        await service.create(createRestaurantDto);
      } catch (err) {
        expect(err.message).toEqual('Restaurant "Restaurant 1" already exists');
        expect(err.status).toEqual(400);
      }
    });
  });

  describe('alreadyExistsRestaurantWithSameName', () => {
    const createRestaurantDto: CreateRestaurantDto = {
      name: 'Restaurant 1',
    };

    it('should return false if the restaurant with the same name does not exist', async () => {
      jest.spyOn(repository, 'findByName').mockResolvedValue(null);

      expect(
        await service.alreadyExistsRestaurantWithSameName(
          createRestaurantDto.name,
        ),
      ).toEqual(false);
    });

    it('should return true if the restaurant with the same name exists', async () => {
      jest.spyOn(repository, 'findByName').mockResolvedValue({
        id: '1',
        name: createRestaurantDto.name,
      });

      expect(
        await service.alreadyExistsRestaurantWithSameName(
          createRestaurantDto.name,
        ),
      ).toEqual(true);
    });
  });

  describe('findById', () => {
    it('should throw error if restaurant does not exist', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      try {
        await service.findById('1');
      } catch (err) {
        expect(err.message).toEqual('Restaurant not found');
        expect(err.status).toEqual(404);
      }
    });

    it('should return restaurant if it exists', async () => {
      const restaurant = {
        id: '1',
        name: 'Restaurant 1',
        dishes: [],
      };

      jest.spyOn(repository, 'findById').mockResolvedValue(restaurant);

      expect(await service.findById('1')).toEqual(restaurant);
    });
  });
});
