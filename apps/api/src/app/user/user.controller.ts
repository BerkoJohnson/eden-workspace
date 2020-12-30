import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

import { UserService } from './user.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  getAll() {
    return this.userService.list();
  }

  @Post()
  @UseGuards(JwtGuard)
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Get(':id')
  // async getUser(@Param('id') id: string) {

  // }
}
