import { v7 as uuidV7 } from 'uuid';
import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { OrderStatusEnum } from '../../app/orders/enums/order-status.enum';

export const orderStatusEnum = pgEnum('order_status', [
  OrderStatusEnum.PENDING,
  OrderStatusEnum.CONFIRMED,
  OrderStatusEnum.DELIVERED,
  OrderStatusEnum.CANCELLED,
]);

export const orders = pgTable('orders', {
  id: uuid('id')
    .$defaultFn(() => uuidV7())
    .primaryKey(),
  customerId: uuid('customer_id').notNull(),
  restaurantId: uuid('restaurant_id').notNull(),
  status: orderStatusEnum('status').notNull().default(OrderStatusEnum.PENDING),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id')
    .$defaultFn(() => uuidV7())
    .primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  menuItemId: uuid('menu_item_id').notNull(),
  name: varchar('name', { length: 150 }).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull().default(1),
});
