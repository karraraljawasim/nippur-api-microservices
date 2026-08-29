import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateOrderInput } from './types/create-order-input.type';
import { orders } from '../../core/database/schema';
import { DATABASE_CONNECTION } from '../../core/database/drizzle.providers';

@Injectable()
export class OrdersRepository {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase,
  ) {}

  async create(data: CreateOrderInput) {
    const [order] = await this.db.insert(orders).values(data).returning();

    return order;
  }
}
