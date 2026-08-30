import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_PATTERN,
  HELPERS,
  ORDER_RABBITMQ_CLIENT,
  RESTAURANTS,
} from '@nippur-api-microservice/shared-contracts';
import { OrdersRepository } from './orders.repository';
import { OrderItemRepository } from './order-item.repository';
import { ClientGrpc, ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom, timeout } from 'rxjs';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { OrderStatusEnum } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  private menuService: RESTAURANTS.MenuServiceClient;

  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemRepository: OrderItemRepository,
    @Inject(RESTAURANTS.RESTAURANTS_PACKAGE_NAME) private client: ClientGrpc,
    @Inject(ORDER_RABBITMQ_CLIENT) private orderRabbitMqClient: ClientProxy,
  ) {
    this.menuService = this.client.getService<RESTAURANTS.MenuServiceClient>(
      RESTAURANTS.MENU_SERVICE_NAME,
    );
  }

  async createOrder(dto: CreateOrderDto) {
    const { items } = await this.getMenuItemSafely(
      dto.items.map((item) => item.menuItemId),
    );

    const menuItemsMap = new Map(items.map((item) => [item.id, item]));

    const resolvedItems = [];
    let total = 0;
    for (const item of dto.items) {
      const menuItem = menuItemsMap.get(item.menuItemId);
      if (!menuItem) {
        throw new RpcException({
          code: GrpcStatus.NOT_FOUND,
          message: `Menu item ${item.menuItemId} not found`,
        });
      }

      if (!menuItem.available) {
        throw new RpcException({
          code: GrpcStatus.FAILED_PRECONDITION,
          message: `Item "${menuItem.name}" is not available`,
        });
      }

      total += parseFloat(menuItem.price) * item.quantity;
      resolvedItems.push({
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });
    }

    const order = await this.ordersRepository.create({
      customerId: dto.customerId,
      restaurantId: dto.restaurantId,
      total: total.toFixed(2),
    });

    await this.orderItemRepository.createMany(
      resolvedItems.map((item) => ({ ...item, orderId: order.id })),
    );

    this.orderRabbitMqClient
      .emit(EVENT_PATTERN.ORDER_CREATED, {
        orderId: order.id,
        total: order.total,
      })
      .subscribe();

    return { ...order, items };
  }

  async getMenuItemSafely(ids: string[]) {
    try {
      return await firstValueFrom(
        this.menuService.getMenuItems({ ids }).pipe(timeout(5000)),
      );
    } catch {
      throw new RpcException({
        code: GrpcStatus.UNAVAILABLE,
        message: 'Could not validate menu items',
      });
    }
  }

  async getOrderWithItems(orderId: string, userId: string) {
    const order = await this.ordersRepository.getOrderById(orderId);
    if (!order) {
      throw new RpcException({
        code: GrpcStatus.NOT_FOUND,
        message: `Order ${orderId} not found`,
      });
    }
    if (order.customerId !== userId) {
      throw new RpcException({
        code: GrpcStatus.PERMISSION_DENIED,
        message: 'You can see jest your order',
      });
    }

    const items =
      await this.orderItemRepository.getOrderItemsByOrderId(orderId);

    return { ...order, items };
  }

  async getOrdersByCustomerId(customerId: string) {
    const row = await this.ordersRepository.getOrdersByCustomerId(customerId);

    const order = row.map((o) => ({
      id: o.id,
      customerId: o.customerId,
      restaurantId: o.restaurantId,
      status: o.status,
      total: o.total,
      createdAt: HELPERS.dateToTimestamp(o.createdAt),
      updatedAt: HELPERS.dateToTimestamp(o.updatedAt),
    }));

    return { order };
  }

  async handleStatusOnPayment(orderId: string, success: boolean) {
    if (success) {
      await this.ordersRepository.updateOrderStatus(
        OrderStatusEnum.CONFIRMED,
        orderId,
      );

      return;
    }

    if (!success) {
      await this.ordersRepository.updateOrderStatus(
        OrderStatusEnum.CANCELLED,
        orderId,
      );

      return;
    }
  }
}
