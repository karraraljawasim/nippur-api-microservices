import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { HELPERS } from '@nippur-api-microservice/shared-contracts';
import { UpdateCurrentUserDto } from './dto/update-current-user.dto';

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
      role: HELPERS.mapInternalUserRoleToProto(newUser.role),
      createdAt: HELPERS.dateToTimestamp(newUser.createdAt),
      updatedAt: HELPERS.dateToTimestamp(newUser.updatedAt),
    };
  }

  async getById(userId: string) {
    const user = await this.usersRepository.findById(userId);
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
      isActive: user.isActive,
      role: HELPERS.mapInternalUserRoleToProto(user.role),
      createdAt: HELPERS.dateToTimestamp(user.createdAt),
      updatedAt: HELPERS.dateToTimestamp(user.updatedAt),
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
      role: HELPERS.mapInternalUserRoleToProto(user.role),
      createdAt: HELPERS.dateToTimestamp(user.createdAt),
      updatedAt: HELPERS.dateToTimestamp(user.updatedAt),
    };
  }

  async updateById(dto: UpdateCurrentUserDto) {
    const user = await this.usersRepository.findById(dto.userId);
    if (!user) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    if (dto.isActive === undefined && dto.name === undefined) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        role: HELPERS.mapInternalUserRoleToProto(user.role),
        createdAt: HELPERS.dateToTimestamp(user.createdAt),
        updatedAt: HELPERS.dateToTimestamp(user.updatedAt),
      };
    }

    const updatedUser = await this.usersRepository.updateById(dto.userId, dto);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
      role: HELPERS.mapInternalUserRoleToProto(updatedUser.role),
      createdAt: HELPERS.dateToTimestamp(updatedUser.createdAt),
      updatedAt: HELPERS.dateToTimestamp(updatedUser.updatedAt),
    };
  }
}
