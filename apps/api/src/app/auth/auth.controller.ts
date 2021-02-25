import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '../shared/user.decorator';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
  ): Promise<{ token: string }> {
    return this.authService.login(data);
  }

  @Get('whoami')
  @UseGuards(JwtGuard)
  async whoami(@User('email') email: string) {
    return this.authService.whoami(email);
  }
}
