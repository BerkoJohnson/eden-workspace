import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { email: string }) {
    const { email } = payload;
    const user = await this.authService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.toResponseObj();
  }
}
