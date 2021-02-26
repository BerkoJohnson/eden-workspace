config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';
import { CandidateEntity } from './elections/candidate.entity';
import { ElectionEntity } from './elections/election.entity';
import { ElectionModule } from './elections/elections.module';
import { PositionEntity } from './elections/position.entity';

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
      entities: [UserEntity, ElectionEntity, PositionEntity, CandidateEntity],
      // dropSchema: true,
    }),
    AuthModule,
    ElectionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
