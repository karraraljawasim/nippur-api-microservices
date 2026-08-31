import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { MenuService } from './menu.service';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [RestaurantsModule],
  controllers: [MenuController],
  providers: [MenuRepository, MenuService],
})
export class MenuModule {}
