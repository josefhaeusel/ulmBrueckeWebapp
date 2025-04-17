import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const logger = new Logger(AppModule.name);

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  await app.listen(3000);

  logger.log(`App listening on http://localhost:${3000}`)
}

bootstrap();