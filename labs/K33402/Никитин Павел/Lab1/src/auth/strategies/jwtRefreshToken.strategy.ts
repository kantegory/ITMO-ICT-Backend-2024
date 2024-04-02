import { PassportStrategy, AuthGuard } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from 'src/auth/auth.service'
import { ConfigService } from 'src/config/config.service'

export type RequestWithJwtPayload = Request & {
  user: JwtPayload & {
    refreshToken: string
  }
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.JWT_KEY,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim()
    return { ...payload, refreshToken }
  }
}

@Injectable()
export class JwtRefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {}
