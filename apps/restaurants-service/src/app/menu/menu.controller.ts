import { Controller } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { GetAllMenuItemsDto } from './dto/get-all-menu-items.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { DeleteMenuItemDto } from './dto/delete-menu-item.dto';
import { GetMenuItemByIdDto } from './dto/get-menu-item-by-id.dto';
import { GetMenuItemsDto } from './dto/get-menu-items.dto';

@Controller('restaurants/:restaurantId/menu')
@RESTAURANTS.MenuServiceControllerMethods()
export class MenuController implements RESTAURANTS.MenuServiceController {
  constructor(private readonly menuService: MenuService) {}

  async createMenuItem(dto: CreateMenuItemDto) {
    return await this.menuService.createMenuItem(dto);
  }

  async getAllMenuItems(dto: GetAllMenuItemsDto) {
    const menuItems = await this.menuService.getAllMenuItems(dto);

    return { menuItems };
  }

  async updateMenuItem(dto: UpdateMenuItemDto) {
    return await this.menuService.updateMenuItem(dto);
  }

  async deleteMenuItem(dto: DeleteMenuItemDto) {
    return await this.menuService.deleteMenuItem(dto);
  }

  async getById(dto: GetMenuItemByIdDto) {
    return await this.menuService.getById(dto);
  }

  async getMenuItems(dto: GetMenuItemsDto) {
    return await this.menuService.getMenuItems(dto.ids);
  }
}
