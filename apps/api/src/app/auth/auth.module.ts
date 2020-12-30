import { Module } from "@nestjs/common";
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';

import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import {environment} from '../../environments/environment';
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: environment.jwt_secret,
      signOptions: {
        expiresIn: environment.expires_in
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
