import { Controller } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { GetRestaurantByIdDto } from './dto/get-restaurant-by-id.dto';
import { UpdateRestaurantByIdDto } from './dto/update-restaurant-by-id.dto';

@Controller('restaurants')
@RESTAURANTS.RestaurantsServiceControllerMethods()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  async createRestaurant(dto: CreateRestaurantsDto) {
    return await this.restaurantsService.create(dto);
  }

  async getById(dto: GetRestaurantByIdDto) {
    return await this.restaurantsService.getById(dto);
  }

  async updateById(dto: UpdateRestaurantByIdDto) {
    return await this.restaurantsService.updateById(dto);
  }

  async getAll() {
    return await this.restaurantsService.getAll();
  }
}
