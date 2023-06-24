import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/modules/app/app.module';

describe('RestaurantsController (e2e)', () => {
  let app: INestApplication;
  let createdRestaurantId = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('/restaurants (POST)', () => {
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
});
