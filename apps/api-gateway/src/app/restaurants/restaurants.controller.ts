import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRestaurantsDto } from './dto/create-restaurants.dto';
import { firstValueFrom } from 'rxjs';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetRestaurantByIdDto } from './dto/get-restaurant-by-id.dto';
import { UpdateRestaurantByIdDto } from './dto/update-restaurant-by-id.dto';

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

  @Get()
  async getAll() {
    return await firstValueFrom(this.restaurantsService.getAll({}));
  }

  @Get(':restaurantId')
  @UseGuards(JwtAuthGuard)
  async getById(@Param() dto: GetRestaurantByIdDto) {
    return await firstValueFrom(this.restaurantsService.getById(dto));
  }

  @Patch(':restaurantId')
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Body() dto: UpdateRestaurantByIdDto,
    @Param() param: GetRestaurantByIdDto,
    @GetUser('sub') sub: string,
  ) {
    return await firstValueFrom(
      this.restaurantsService.updateById({
        ...dto,
        userId: sub,
        restaurantId: param.restaurantId,
      }),
    );
  }
}
