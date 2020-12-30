import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: { email: string; password: string }
  ): Promise<{ accessToken: string }> {
    return this.authService.login(data);
  }
}
