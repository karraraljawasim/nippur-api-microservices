import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../core/database/drizzle.providers';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { orderItems } from '../../core/database/schema';
import { CreateOrderItemInput } from './types/create-order-item-input.type';

@Injectable()
export class OrderItemRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: NodePgDatabase) {}

  async createMany(data: CreateOrderItemInput[]) {
    return await this.db.insert(orderItems).values(data).returning();
  }
}
