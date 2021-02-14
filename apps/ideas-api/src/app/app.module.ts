import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'berkojohnson',
    password: 'berko391!!',
    database: 'ideas',
    synchronize: true,
    logging: true,
    autoLoadEntities: true
  }), IdeaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
