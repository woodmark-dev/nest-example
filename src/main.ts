import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //Stripping out what is not defined in our dto
      whitelist: true,
    }),
  );
  await app.listen(2350);
}
bootstrap();
