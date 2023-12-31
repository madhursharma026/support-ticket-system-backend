const cors = require( `cors` );
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use( cors() );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      stopAtFirstError: true,
    }),
  );
  await app.listen(8000);
}
bootstrap();

