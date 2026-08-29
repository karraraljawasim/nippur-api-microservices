import { Injectable } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { HELPERS } from '@nippur-api-microservice/shared-contracts';
import { RpcException } from '@nestjs/microservices';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { GetAllMenuItemsDto } from './dto/get-all-menu-items.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { DeleteMenuItemDto } from './dto/delete-menu-item.dto';
import { GetMenuItemByIdDto } from './dto/get-menu-item-by-id.dto';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restaurantService: RestaurantsService,
  ) {}

  async createMenuItem(dto: CreateMenuItemDto) {
    const restaurant = await this.restaurantService.getById({
      restaurantId: dto.restaurantId,
    });

    if (restaurant.ownerId !== dto.userId) {
      throw new RpcException({
        code: GrpcStatus.ALREADY_EXISTS,
        message: 'You can create menu items only for your restaurant',
      });
    }

    const menuItem = await this.menuRepository.createMenuItem(dto);

    return {
      id: menuItem.id,
      restaurantId: menuItem.restaurantId,
      name: menuItem.name,
      price: menuItem.price,
      description: menuItem.description,
      available: menuItem.available,
      createdAt: HELPERS.dateToTimestamp(menuItem.createdAt),
    };
  }

  async getAllMenuItems(dto: GetAllMenuItemsDto) {
    await this.restaurantService.getById({
      restaurantId: dto.restaurantId,
    });

    return await this.menuRepository.getAllMenuItems(dto.restaurantId);
  }

  async updateMenuItem(dto: UpdateMenuItemDto) {
    const restaurant = await this.restaurantService.getById({
      restaurantId: dto.restaurantId,
    });

    if (restaurant.ownerId !== dto.userId) {
      throw new RpcException({
        code: GrpcStatus.ALREADY_EXISTS,
        message: 'You can update menu items only for your restaurant',
      });
    }

    const menuItem = await this.menuRepository.findById(dto.menuItemId);
    if (!menuItem) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'Menu item not found',
      });
    }

    const updatedItem = await this.menuRepository.updateMenuItem(
      dto.menuItemId,
      dto,
    );

    return {
      id: updatedItem.id,
      restaurantId: updatedItem.restaurantId,
      name: updatedItem.name,
      description: updatedItem.description,
      available: updatedItem.available,
      price: updatedItem.price,
      createdAt: HELPERS.dateToTimestamp(updatedItem.createdAt),
    };
  }

  async deleteMenuItem(dto: DeleteMenuItemDto) {
    const restaurant = await this.restaurantService.getById({
      restaurantId: dto.restaurantId,
    });

    if (restaurant.ownerId !== dto.userId) {
      throw new RpcException({
        code: GrpcStatus.ALREADY_EXISTS,
        message: 'You can update menu items only for your restaurant',
      });
    }

    const menuItem = await this.menuRepository.findById(dto.menuItemId);
    if (!menuItem) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'Menu item not found',
      });
    }

    const deletedItem = await this.menuRepository.deleteMenuItem(
      dto.menuItemId,
    );

    return {
      id: deletedItem.id,
      restaurantId: deletedItem.restaurantId,
      name: deletedItem.name,
      description: deletedItem.description,
      available: deletedItem.available,
      price: deletedItem.price,
      createdAt: HELPERS.dateToTimestamp(deletedItem.createdAt),
    };
  }

  async getById(dto: GetMenuItemByIdDto) {
    await this.restaurantService.getById({
      restaurantId: dto.restaurantId,
    });

    const menuItem = await this.menuRepository.findById(dto.menuItemId);
    if (!menuItem) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: 'Menu item not found',
      });
    }

    return {
      id: menuItem.id,
      restaurantId: menuItem.restaurantId,
      name: menuItem.name,
      description: menuItem.description,
      available: menuItem.available,
      price: menuItem.price,
      createdAt: HELPERS.dateToTimestamp(menuItem.createdAt),
    };
  }

  async getMenuItems(ids: string[]) {
    const items = await this.menuRepository.getMenuItems(ids);

    return { items };
  }
}
