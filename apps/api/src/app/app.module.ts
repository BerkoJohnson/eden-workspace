import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

import { environment } from '../environments/environment';
import { UserModule } from './user/user.module';
import { ElectionModule } from './election/election.module';
@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb_uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    ElectionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
