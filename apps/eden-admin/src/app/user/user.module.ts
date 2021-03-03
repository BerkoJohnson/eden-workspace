import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
