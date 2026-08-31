import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { menuItems } from '../../core/database/schema';
import { eq, inArray } from 'drizzle-orm';

@Injectable()
export class MenuRepository {
  constructor(@Inject('DATABASE_CONNECTION') private db: NodePgDatabase) {}

  async createMenuItem(data: {
    name: string;
    price: string;
    restaurantId: string;
    description?: string;
  }) {
    const [row] = await this.db.insert(menuItems).values(data).returning();

    return row;
  }

  async getAllMenuItems(restaurantId: string) {
    return await this.db
      .select({
        id: menuItems.id,
        name: menuItems.name,
        price: menuItems.price,
        description: menuItems.description,
      })
      .from(menuItems)
      .where(eq(menuItems.restaurantId, restaurantId));
  }

  async updateMenuItem(
    menuItemId: string,
    data: { price?: string; available?: boolean },
  ) {
    const [row] = await this.db
      .update(menuItems)
      .set({
        price: data.price,
        available: data.available,
      })
      .where(eq(menuItems.id, menuItemId))
      .returning();

    return row;
  }

  async findById(menuItemId: string) {
    const [row] = await this.db
      .select()
      .from(menuItems)
      .where(eq(menuItems.id, menuItemId));

    return row;
  }

  async deleteMenuItem(menuItemId: string) {
    const [row] = await this.db
      .delete(menuItems)
      .where(eq(menuItems.id, menuItemId))
      .returning();

    return row;
  }

  async getMenuItems(ids: string[]) {
    return await this.db
      .select({
        id: menuItems.id,
        restaurantId: menuItems.restaurantId,
        name: menuItems.name,
        price: menuItems.price,
        available: menuItems.available,
      })
      .from(menuItems)
      .where(inArray(menuItems.id, ids));
  }
}
