import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateRestaurantsData } from './types/create-restaurants-data.types';
import { restaurants } from '../../core/database/schema';
import { eq } from 'drizzle-orm';
import { UpdateRestaurantData } from './types/update-restaurants-data.types';

@Injectable()
export class RestaurantsRepository {
  constructor(@Inject('DATABASE_CONNECTION') private db: NodePgDatabase) {}

  async create(data: CreateRestaurantsData) {
    const [row] = await this.db.insert(restaurants).values(data).returning();

    return row;
  }

  async findById(restaurantId: string) {
    const [row] = await this.db
      .select()
      .from(restaurants)
      .where(eq(restaurants.id, restaurantId));

    return row;
  }

  async updateById(restaurantId: string, data: UpdateRestaurantData) {
    const [row] = await this.db
      .update(restaurants)
      .set({
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        isOpen: data.isOpen,
        updatedAt: new Date(),
      })
      .where(eq(restaurants.id, restaurantId))
      .returning();

    return row;
  }

  async getAll() {
    return await this.db
      .select({
        id: restaurants.id,
        name: restaurants.name,
        address: restaurants.address,
        phone: restaurants.phone,
      })
      .from(restaurants);
  }
}
