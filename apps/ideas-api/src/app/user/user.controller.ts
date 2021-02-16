import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
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
  showAllUsers() {
    return this.userService.showAllUsers();
  }
}
