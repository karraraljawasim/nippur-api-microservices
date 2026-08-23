import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateRestaurantsData } from './types/create-restaurants-data.types';
import { restaurants } from '../../core/database/schema';

@Injectable()
export class RestaurantsRepository {
  constructor(@Inject('DATABASE_CONNECTION') private db: NodePgDatabase) {}

  async create(data: CreateRestaurantsData) {
    const [row] = await this.db.insert(restaurants).values(data).returning();

    return row;
  }
}
