import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PrismaService } from '../src/config/prisma';
import { AppModule } from './../src/modules/app/app.module';

describe('RestaurantsController (e2e)', () => {
  let app: INestApplication;
  let createdRestaurantId = null;

  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close(), prismaService.disconnect()]);

    await prismaService.dish.deleteMany({
      where: {
        restaurantId: createdRestaurantId,
      },
    });

    await prismaService.restaurant.delete({
      where: {
        id: createdRestaurantId,
      },
    });
  });
  describe('/restaurants (POST)', () => {
    it('should throw error if name field is not provided', () => {
      return request(app.getHttpServer())
        .post('/restaurants')
        .send({})
        .expect(400, {
          ok: false,
          error: true,
          message: "The 'name' field is required.",
          status: 400,
          data: null,
        });
    });

    it('should create a new restaurant', async () => {
      return request(app.getHttpServer())
        .post('/restaurants')
        .send({
          name: 'My amazing restaurant',
        })
        .expect((res) => {
          createdRestaurantId = res.body.data.id;

          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 201,
              data: expect.any(Object),
            }),
          );
        });
    });

    it('should throw error if restaurant with same name already exists', async () => {
      request(app.getHttpServer()).post('/restaurants').send({
        name: 'My amazing restaurant',
      });

      return request(app.getHttpServer())
        .post('/restaurants')
        .send({
          name: 'My amazing restaurant',
        })
        .expect(400, {
          ok: false,
          error: true,
          message: 'Restaurant "My amazing restaurant" already exists',
          status: 400,
          data: null,
        });
    });
  });

  describe('/restaurants (GET)', () => {
    it('should get all restaurants with default page 1', () => {
      return request(app.getHttpServer())
        .get('/restaurants')
        .expect((res) => {
          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 200,
              data: {
                totalCount: expect.any(Number),
                restaurants: expect.any(Array),
              },
            }),
          );
        });
    });

    it('should get all restaurants with page 2', () => {
      return request(app.getHttpServer())
        .get('/restaurants?page=2')
        .expect((res) => {
          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 200,
              data: {
                totalCount: expect.any(Number),
                restaurants: expect.any(Array),
              },
            }),
          );
        });
    });
  });

  describe('/restaurants/:id (GET)', () => {
    it('should return restaurant by id', () => {
      return request(app.getHttpServer())
        .get(`/restaurants/${createdRestaurantId}`)
        .expect((res) => {
          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 200,
              data: expect.any(Object),
            }),
          );
        });
    });

    it("should throw error if restaurant doesn't exists", () => {
      return request(app.getHttpServer()).get(`/restaurants/123`).expect(404, {
        ok: false,
        error: true,
        message: 'Restaurant not found',
        status: 404,
        data: null,
      });
    });
  });

  describe('/restaurants/:id/dishes (POST)', () => {
    it('should throw error if description field is not provided', () => {
      return request(app.getHttpServer())
        .post(`/restaurants/${createdRestaurantId}/dishes`)
        .send({
          name: 'My amazing dish',
          price: 10,
        })
        .expect(400, {
          ok: false,
          error: true,
          message: "The 'description' field is required.",
          status: 400,
          data: null,
        });
    });
    it('should create a new dish', () => {
      return request(app.getHttpServer())
        .post(`/restaurants/${createdRestaurantId}/dishes`)
        .send({
          name: 'My amazing dish',
          price: 10,
          description: 'My amazing dish description',
        })
        .expect((res) => {
          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 201,
              data: expect.any(Object),
            }),
          );
        });
    });
  });

  describe('/restaurants/:id/dishes (GET)', () => {
    it("should get restaurant's dishes", () => {
      return request(app.getHttpServer())
        .get(`/restaurants/${createdRestaurantId}/dishes`)
        .expect((res) => {
          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 200,
              data: {
                totalCount: expect.any(Number),
                dishes: expect.any(Array),
              },
            }),
          );
        });
    });

    it("should get all restaurants's dishes with default page 1", () => {
      return request(app.getHttpServer())
        .get(`/restaurants/${createdRestaurantId}/dishes`)
        .expect((res) => {
          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 200,
              data: {
                totalCount: expect.any(Number),
                dishes: expect.any(Array),
              },
            }),
          );
        });
    });

    it("should get all restaurants's dishes with page 2", () => {
      return request(app.getHttpServer())
        .get(`/restaurants/${createdRestaurantId}/dishes?page=2`)
        .expect((res) => {
          return expect(res.body).toEqual(
            expect.objectContaining({
              ok: true,
              error: false,
              message: null,
              status: 200,
              data: {
                totalCount: expect.any(Number),
                dishes: expect.any(Array),
              },
            }),
          );
        });
    });
  });
});
