import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { mapInternalRoleToProto } from './helpers/map-internal-role-to-proto.helpers';
import { dateToTimestamp } from './helpers/date-to-timestamp.helpers';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new RpcException({
        code: GrpcStatus.ALREADY_EXISTS,
        message: 'User already exists',
      });
    }

    const newUser = await this.usersRepository.createUser(dto);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isActive: newUser.isActive,
      role: mapInternalRoleToProto(newUser.role),
      createdAt: dateToTimestamp(newUser.createdAt),
      updatedAt: dateToTimestamp(newUser.updatedAt),
    };
  }

  async getById(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (user) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      role: mapInternalRoleToProto(user.role),
      createdAt: dateToTimestamp(user.createdAt),
      updatedAt: dateToTimestamp(user.updatedAt),
    };
  }

  async getByEmailWithPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      isActive: user.isActive,
      role: mapInternalRoleToProto(user.role),
      createdAt: dateToTimestamp(user.createdAt),
      updatedAt: dateToTimestamp(user.updatedAt),
    };
  }
}
