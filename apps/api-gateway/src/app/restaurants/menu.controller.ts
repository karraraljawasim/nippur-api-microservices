import {
  Body,
  Controller,
  Delete,
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
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Controller('restaurants/:restaurantId/menu')
export class MenuController implements OnModuleInit {
  private menuService: RESTAURANTS.MenuServiceClient;

  constructor(
    @Inject(RESTAURANTS.RESTAURANTS_PACKAGE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.menuService = this.client.getService<RESTAURANTS.MenuServiceClient>(
      RESTAURANTS.MENU_SERVICE_NAME,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMenuItem(
    @Param('restaurantId') restaurantId: string,
    @Body() dto: CreateMenuItemDto,
    @GetUser('sub') userId: string,
  ) {
    return await firstValueFrom(
      this.menuService.createMenuItem({ restaurantId, userId, ...dto }),
    );
  }

  @Get()
  async getAllMenuItems(@Param('restaurantId') restaurantId: string) {
    return await firstValueFrom(
      this.menuService.getAllMenuItems({ restaurantId }),
    );
  }

  @Get(':menuItemId')
  async getById(
    @Param('restaurantId') restaurantId: string,
    @Param('menuItemId') menuItemId: string,
  ) {
    return await firstValueFrom(
      this.menuService.getById({ restaurantId, menuItemId }),
    );
  }

  @Patch(':menuItemId')
  @UseGuards(JwtAuthGuard)
  async updateMenuItem(
    @Param('menuItemId') menuItemId: string,
    @Param('restaurantId') restaurantId: string,
    @Body() dto: UpdateMenuItemDto,
    @GetUser('sub') userId: string,
  ) {
    return await firstValueFrom(
      this.menuService.updateMenuItem({
        menuItemId,
        userId,
        restaurantId,
        ...dto,
      }),
    );
  }

  @Delete(':menuItemId')
  @UseGuards(JwtAuthGuard)
  async deleteMenuItem(
    @Param('menuItemId') menuItemId: string,
    @Param('restaurantId') restaurantId: string,
    @Body() dto: UpdateMenuItemDto,
    @GetUser('sub') userId: string,
  ) {
    return await firstValueFrom(
      this.menuService.deleteMenuItem({
        menuItemId,
        userId,
        restaurantId,
        ...dto,
      }),
    );
  }
}
