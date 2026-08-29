import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CoreModule } from '../core/core.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [CoreModule, RestaurantsModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
