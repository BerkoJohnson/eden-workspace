import {
  BadRequestException,
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
    private jwtService: JwtService,
  ) {}

  private tokenize(user: UserDocument, secret: string, timeLimit: string) {
    const accessToken = this.jwtService.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: timeLimit,
        secret: secret,
      },
    );
    return { token: accessToken };
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
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
      return this.tokenize(
        found,
        environment.jwt_secret,
        environment.expires_in,
      );
    }
  }

  async whoami(email: string) {
    const found = await this.userService.findByEmail(email);

    if (!found) {
      throw new BadRequestException('Invalid user credentials');
    }
    // return jwt token to front-end
    return this.tokenize(found, environment.jwt_secret, environment.expires_in);
  }
}
