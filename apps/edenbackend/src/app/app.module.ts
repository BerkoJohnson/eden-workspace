import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ElectionModule } from './elections/elections.module';
import { CandidateEntity, ElectionEntity, PositionEntity, UserEntity } from './entities';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { RolesGuard } from './shared/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT | 5432,
      synchronize: true,
      logging: true,
      entities: [CandidateEntity, PositionEntity,ElectionEntity, UserEntity],
      // dropSchema: true,
    }),
    AuthModule,
    ElectionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
