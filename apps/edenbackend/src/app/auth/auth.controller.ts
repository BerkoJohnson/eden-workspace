import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('api/users')
  @UseGuards(JwtGuard)
  async getUsers() {
    return this.authService.getUsers();
  }

  @Post('api/users')
  @UseGuards(JwtGuard)
  async create(@Body(ValidationPipe) data: AuthDto) {
    return this.authService.createUser(data);
  }

  @Get('api/users/:userId')
  @UseGuards(JwtGuard)
  getSingleUser(@Param('userId') userId: string) {
    return this.authService.getUser(userId);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
