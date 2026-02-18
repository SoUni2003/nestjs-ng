import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

type JwtAdminPayload = {
  sub: string;
  email: string;
  role: 'admin';
};

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET') || 'changeme',
    });
  }

  validate(payload: JwtAdminPayload) {
    if (payload.role !== 'admin') {
      return null;
    }
    return payload;
  }
}
