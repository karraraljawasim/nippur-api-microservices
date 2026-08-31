import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EVENT_PATTERN } from '@nippur-api-microservice/shared-contracts';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersEventController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern(EVENT_PATTERN.PAYMENT_SUCCEEDED)
  async handlePaymentSucceeded(@Payload() data: { orderId: string }) {
    await this.ordersService.handleStatusOnPayment(data.orderId, true);
  }

  @EventPattern(EVENT_PATTERN.PAYMENT_FAILED)
  async handlePaymentFailed(@Payload() data: { orderId: string }) {
    await this.ordersService.handleStatusOnPayment(data.orderId, false);
  }
}
