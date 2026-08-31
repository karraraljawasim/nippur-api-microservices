import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  EVENT_PATTERN,
  OrderCreatedEvent,
} from '@nippur-api-microservice/shared-contracts';

@Controller()
export class NotificationController {
  private logger = new Logger('Notification');

  @EventPattern(EVENT_PATTERN.ORDER_CREATED)
  async handleOrderCreated(@Payload() data: OrderCreatedEvent) {
    this.logger.log(`Order created: ${data.orderId}`);
  }

  @EventPattern(EVENT_PATTERN.PAYMENT_SUCCEEDED)
  async handlePaymentSucceeded(@Payload() data: { orderId: string }) {
    this.logger.log(`Payment succeeded to order: ${data.orderId}`);
  }

  @EventPattern(EVENT_PATTERN.PAYMENT_FAILED)
  async handlePaymentFailed(@Payload() data: { orderId: string }) {
    this.logger.log(`Payment failed to order: ${data.orderId}`);
  }
}
