import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ORDERS } from '@nippur-api-microservice/shared-contracts';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('orders')
export class OrdersController implements OnModuleInit {
  private ordersService: ORDERS.OrderServiceClient;
  constructor(
    @Inject(ORDERS.ORDER_PACKAGE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.ordersService = this.client.getService<ORDERS.OrderServiceClient>(
      ORDERS.ORDER_SERVICE_NAME,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() dto: CreateOrderDto,
    @GetUser('sub') userId: string,
  ) {
    return await firstValueFrom(
      this.ordersService.createOrder({ customerId: userId, ...dto }),
    );
  }
}
