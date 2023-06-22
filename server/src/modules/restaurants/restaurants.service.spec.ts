import { Test, TestingModule } from '@nestjs/testing';
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
      jest.spyOn(repository, 'findByName').mockResolvedValue({
        ...createRestaurantDtoOutput,
        dish: [],
      });

      try {
        await service.create(createRestaurantDto);
      } catch (err) {
        expect(err.message).toEqual('Restaurant "Restaurant 1" already exists');
        expect(err.status).toEqual(400);
      }
    });
  });
});
