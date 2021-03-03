import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { SkipAuth } from '../decorators/is-public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  async getProfile(@Request() req: any) {
    const user = await this.authService.getUser(req.user.email);
    return user.toResponse();
  }
}
