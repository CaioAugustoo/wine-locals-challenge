import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { ApiKeyGuard } from './shared';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: process.env.CORS_ENABLED === 'true',
  });

  app.useGlobalGuards(new ApiKeyGuard());

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Share Eat - Rest API')
    .setDescription(
      `
      This is the Share Eat API. In this docs, you can find all the endpoints and models used in the Share Eat API.
    `,
    )
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
