import { Injectable } from '@nestjs/common';
import { HELPERS } from '@nippur-api-microservice/shared-contracts';
import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { RestaurantsRepository } from './restaurants.repository';

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
}
