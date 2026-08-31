import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateOrderInput } from './types/create-order-input.type';
import { orders } from '../../core/database/schema';
import { DATABASE_CONNECTION } from '../../core/database/drizzle.providers';
import { eq } from 'drizzle-orm';
import { OrderStatusEnum } from './enums/order-status.enum';

@Injectable()
export class OrdersRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase,
  ) {}

  async create(data: CreateOrderInput) {
    const [order] = await this.db.insert(orders).values(data).returning();

    return order;
  }

  async getOrderById(ordersId: string) {
    const [row] = await this.db
      .select()
      .from(orders)
      .where(eq(orders.id, ordersId));
    return row;
  }

  async getOrdersByCustomerId(customerId: string) {
    return await this.db
      .select()
      .from(orders)
      .where(eq(orders.customerId, customerId));
  }

  async updateOrderStatus(status: OrderStatusEnum, orderId: string) {
    await this.db
      .update(orders)
      .set({ status: status })
      .where(eq(orders.id, orderId));
  }
}
