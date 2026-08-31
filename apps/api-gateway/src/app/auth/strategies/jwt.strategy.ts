import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PassportStrategy } from '@nestjs/passport';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/auth.types';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements OnModuleInit
{
  private usersService: USERS.UserServiceClient;
  constructor(
    @Inject(USERS.USERS_PACKAGE_NAME) private usersClient: ClientGrpc,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  onModuleInit() {
    this.usersService = this.usersClient.getService<USERS.UserServiceClient>(
      USERS.USER_SERVICE_NAME,
    );
  }
  async validate(payload: JwtPayload) {
    return payload;
  }
}
