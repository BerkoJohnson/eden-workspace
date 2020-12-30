import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';

import { UserService } from '../user/user.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(data: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; expiresIn: number }> {
    const { email, password } = data;

    const found = await this.userService.findByEmail(email);

    if (!found) {
      throw new BadRequestException('Invalid user credentials');
    }

    const hashed = await this.userService.hashPw(password, found.salt);

    if (hashed !== found.password) {
      throw new UnauthorizedException('Incorrect email or password');
    } else {
      // return jwt token to front-end

      const accessToken = await this.jwtService.sign({
        email: found.email,
        role: found.role,
      });
      return { accessToken, expiresIn: environment.expires_in };
    }
  }
}
