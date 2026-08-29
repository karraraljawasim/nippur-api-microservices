import { Controller } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS } from '@nippur-api-microservice/shared-contracts';
import { OrdersService } from './orders.service';

@Controller('orders')
@ORDERS.OrderServiceControllerMethods()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  async createOrder(dto: CreateOrderDto) {
    return await this.ordersService.createOrder(dto);
  }
}
