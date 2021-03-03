/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // get configuration setting from .env file through configService
  const configService = app.get(ConfigService);
  const config = configService.get<APP_CONFIG>('app');
  await app.listen(config.port, () => {
    Logger.log('Listening at http://localhost:' + config.port, 'APP_STARTED');
  });
}

bootstrap();
