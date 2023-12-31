import { RedisModule } from '@nestjs-modules/ioredis';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerMiddleware } from '../../shared/middlewares';
import { DishesModule } from '../dishes/dishes.module';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    RestaurantsModule,
    DishesModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.test', '.env.local'],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: Number(process.env.THROTTLER_LIMIT_TTL) ?? 60,
      limit: Number(process.env.THROTTLER_LIMIT_LIMIT) ?? 20,
    }),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URI ?? 'redis://localhost:6379',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
