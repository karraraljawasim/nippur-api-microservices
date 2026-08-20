import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../core/database/drizzle.providers';
import { eq } from 'drizzle-orm';
import { users } from '../../core/database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: NodePgDatabase) {}

  async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    const [row] = await this.db.insert(users).values(data).returning();

    return row;
  }

  async findByEmail(email: string) {
    const [row] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return row;
  }

  async findById(userId: string) {
    const [row] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    return row;
  }
}
