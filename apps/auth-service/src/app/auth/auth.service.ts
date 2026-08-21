import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { USERS } from '@nippur-api-microservice/shared-contracts';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'node:crypto';
import crypto from 'crypto';
import { JwtPayload, TokenPair } from './types/auth.types';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';
import { AUTH_CONSTANTS } from './constants/auth.constants';
import { mapProtoRoleToInternal } from './helpers/map-proto-role-to-internal.helper';
import { LoginUserDto } from './dto/login-user.dto';
import { status as GrpcStatus } from '@grpc/grpc-js';

@Injectable()
export class AuthService implements OnModuleInit {
  private usersService: USERS.UserServiceClient;

  constructor(
    @Inject(USERS.USERS_PACKAGE_NAME) private usersClient: ClientGrpc,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.usersService = this.usersClient.getService<USERS.UserServiceClient>(
      USERS.USER_SERVICE_NAME,
    );
  }
  async register(dto: RegisterUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await firstValueFrom(
      this.usersService.createUser({
        name: dto.name,
        email: dto.email,
        passwordHash,
      }),
    );

    return this.issueTokens({
      sub: user.id,
      role: mapProtoRoleToInternal(user.role),
    });
  }

  async login(dto: LoginUserDto) {
    let user: USERS.User;
    try {
      user = await firstValueFrom(
        this.usersService.getByEmailWithPassword({ email: dto.email }),
      );
    } catch (error) {
      console.error(error);
      throw new RpcException({
        code: GrpcStatus.UNAUTHENTICATED,
        message: 'Invalid email or password.',
      });
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    console.error(isValidPassword);
    if (!isValidPassword) {
      throw new RpcException({
        code: GrpcStatus.UNAUTHENTICATED,
        message: 'Invalid email or password.',
      });
    }

    return this.issueTokens({
      sub: user.id,
      role: mapProtoRoleToInternal(user.role),
    });
  }

  private async issueTokens(payload: JwtPayload): Promise<TokenPair> {
    const jti = randomUUID();
    const accessToken = await this.jwtService.signAsync({ ...payload, jti });

    const refreshToken = await this.jwtService.signAsync(
      { ...payload, jti },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRY',
        ) as JwtSignOptions['expiresIn'],
      },
    );

    const tokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    await this.authRepository.storeRefreshToken({
      userId: payload.sub,
      tokenHash,
      expiresAt: new Date(Date.now() + AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY_MS),
    });

    return { accessToken, refreshToken };
  }
}
