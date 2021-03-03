import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

config();
import { Module } from '@nestjs/common';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ElectionModule } from './elections/elections.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { RolesGuard } from './shared/roles.guard';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, ElectionModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
