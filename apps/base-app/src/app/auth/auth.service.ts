import { ForbiddenException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      return user;
    }

    return null;
  }

  async getUser(email: string) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new ForbiddenException();
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
