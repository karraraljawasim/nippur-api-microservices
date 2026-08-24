import { Injectable } from '@nestjs/common';
import { HELPERS } from '@nippur-api-microservice/shared-contracts';
import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { RestaurantsRepository } from './restaurants.repository';
import { GetRestaurantByIdDto } from './dto/get-restaurant-by-id.dto';
import { RpcException } from '@nestjs/microservices';
import { GrpcStatus } from '@nestjs/microservices/enums/grpc-status.enum';
import { UpdateRestaurantByIdDto } from './dto/update-restaurant-by-id.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  async create(dto: CreateRestaurantsDto) {
    const restaurant = await this.restaurantsRepository.create(dto);

    return {
      id: restaurant.id,
      ownerId: restaurant.ownerId,
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      phone: restaurant.phone,
      isOpen: restaurant.isOpen,
      createdAt: HELPERS.dateToTimestamp(restaurant.createdAt),
      updatedAt: HELPERS.dateToTimestamp(restaurant.updatedAt),
    };
  }

  async getById(dto: GetRestaurantByIdDto) {
    const restaurant = await this.restaurantsRepository.findById(
      dto.restaurantId,
    );

    if (!restaurant) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'Restaurant not found',
      });
    }

    return {
      id: restaurant.id,
      ownerId: restaurant.ownerId,
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      phone: restaurant.phone,
      isOpen: restaurant.isOpen,
      createdAt: HELPERS.dateToTimestamp(restaurant.createdAt),
      updatedAt: HELPERS.dateToTimestamp(restaurant.updatedAt),
    };
  }

  async updateById(dto: UpdateRestaurantByIdDto) {
    const restaurant = await this.restaurantsRepository.findById(
      dto.restaurantId,
    );

    if (!restaurant) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'Restaurant not found',
      });
    }

    if (restaurant.ownerId !== dto.userId) {
      throw new RpcException({
        code: GrpcStatus.PERMISSION_DENIED,
        message: `You can update just your restaurant`,
      });
    }

    const updatedRestaurant = await this.restaurantsRepository.updateById(
      dto.restaurantId,
      dto,
    );

    return {
      id: updatedRestaurant.id,
      ownerId: updatedRestaurant.ownerId,
      name: updatedRestaurant.name,
      description: updatedRestaurant.description,
      address: updatedRestaurant.address,
      phone: updatedRestaurant.phone,
      isOpen: updatedRestaurant.isOpen,
      createdAt: HELPERS.dateToTimestamp(updatedRestaurant.createdAt),
      updatedAt: HELPERS.dateToTimestamp(updatedRestaurant.updatedAt),
    };
  }

  async getAll() {
    const restaurants = await this.restaurantsRepository.getAll();

    return { restaurants };
  }
}
