import { Controller } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS } from '@nippur-api-microservice/shared-contracts';
import { OrdersService } from './orders.service';
import { GetOrderWithItemsDto } from './dto/get-order-with-items.dto';
import { GetUserOrdersDto } from './dto/get-user-orders.dto';

@Controller('orders')
@ORDERS.OrderServiceControllerMethods()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  async createOrder(dto: CreateOrderDto) {
    return await this.ordersService.createOrder(dto);
  }

  async getOrderWithItems(dto: GetOrderWithItemsDto) {
    return await this.ordersService.getOrderWithItems(dto.orderId, dto.userId);
  }

  async getUserOrders(dto: GetUserOrdersDto) {
    return await this.ordersService.getOrdersByCustomerId(dto.userId);
  }
}
