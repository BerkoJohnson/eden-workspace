import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthDto, LoginDto } from '../dtos';
import { AuthService } from './auth.service';
import { JwtGuard } from '../shared/jwt.guard';
import { Roles } from '../shared/roles.decorator';
import { ROLES } from '../shared/roles.enum';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('api/users')
  @UseGuards(JwtGuard)
  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN)
  async getUsers() {
    return this.authService.getUsers();
  }

  @Post('api/users')
  @UseGuards(JwtGuard)
  @Roles(ROLES.SUPERADMIN)
  async create(@Body(ValidationPipe) data: AuthDto) {
    return this.authService.createUser(data);
  }

  @Get('api/users/:userId')
  @UseGuards(JwtGuard)
  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN)
  getSingleUser(@Param('userId') userId: string) {
    return this.authService.getUser(userId);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
