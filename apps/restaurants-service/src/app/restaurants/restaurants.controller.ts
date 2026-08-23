import { Controller } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

@Controller('restaurants')
@RESTAURANTS.RestaurantsServiceControllerMethods()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  async createRestaurant(dto: CreateRestaurantsDto) {
    return await this.restaurantsService.create(dto);
  }
}
