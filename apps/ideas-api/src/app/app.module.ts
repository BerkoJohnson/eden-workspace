import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { IdeaModule } from './idea/idea.module';
import { HttpErrorFilter } from './shared/http-err.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { UserEntity, IdeaEntity, CommentEntity } from './entities';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'berkojohnson',
      password: 'berko391!!',
      database: 'ideasdb',
      port: 5432,
      synchronize: true,
      logging: true,
      entities: [UserEntity, IdeaEntity, CommentEntity],
    }),
    UserModule,
    IdeaModule,
    CommentModule,
  ],
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
  ],
})
export class AppModule {}
