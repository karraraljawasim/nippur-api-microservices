import {
  EVENT_PATTERN,
  NOTIFICATION_RABBITMQ_CLIENT,
  OrderCreatedEvent,
  PAYMENT_RABBITMQ_CLIENT,
} from '@nippur-api-microservice/shared-contracts';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject(PAYMENT_RABBITMQ_CLIENT) private paymentRabbitMqClient: ClientProxy,
    @Inject(NOTIFICATION_RABBITMQ_CLIENT)
    private notificationRabbitMqClient: ClientProxy,
  ) {}

  @EventPattern(EVENT_PATTERN.ORDER_CREATED)
  async handleOrderCreated(@Payload() data: OrderCreatedEvent) {
    const success = await this.paymentService.handlePayment();

    this.paymentRabbitMqClient
      .emit(
        success
          ? EVENT_PATTERN.PAYMENT_SUCCEEDED
          : EVENT_PATTERN.PAYMENT_FAILED,
        { orderId: data.orderId },
      )
      .subscribe();

    this.notificationRabbitMqClient
      .emit(
        success
          ? EVENT_PATTERN.PAYMENT_SUCCEEDED
          : EVENT_PATTERN.PAYMENT_FAILED,
        { orderId: data.orderId },
      )
      .subscribe();
  }
}
