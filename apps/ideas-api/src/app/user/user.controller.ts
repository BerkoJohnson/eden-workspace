import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body(ValidationPipe) data: UserDto) {
    return this.userService.login(data);
  }

  @Post('register')
  register(@Body(ValidationPipe) data: UserDto) {
    return this.userService.register(data);
  }

  @Get('api/users')
  @UseGuards(AuthGuard)
  showAllUsers() {
    return this.userService.showAllUsers();
  }
}
