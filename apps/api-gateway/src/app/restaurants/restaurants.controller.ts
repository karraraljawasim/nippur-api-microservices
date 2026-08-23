import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { firstValueFrom } from 'rxjs';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('restaurants')
export class RestaurantsController implements OnModuleInit {
  private restaurantsService: RESTAURANTS.RestaurantsServiceClient;

  constructor(
    @Inject(RESTAURANTS.RESTAURANTS_PACKAGE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.restaurantsService =
      this.client.getService<RESTAURANTS.RestaurantsServiceClient>(
        RESTAURANTS.RESTAURANTS_SERVICE_NAME,
      );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@GetUser('sub') sub: string, @Body() dto: CreateRestaurantsDto) {
    return await firstValueFrom(
      this.restaurantsService.createRestaurant({ ownerId: sub, ...dto }),
    );
  }
}
