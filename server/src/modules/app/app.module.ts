import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/shared';
import { RestaurantsController } from '../restaurants/restaurants.controller';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RestaurantsModule],
  controllers: [AppController, RestaurantsController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
