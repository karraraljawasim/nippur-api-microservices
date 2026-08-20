import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../../core/database/drizzle.providers';
import { refreshTokens } from '../../core/database/schema';
import { and, eq, gt } from 'drizzle-orm';

@Injectable()
export class AuthRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: NodePgDatabase) {}

  async storeRefreshToken(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    await this.db.insert(refreshTokens).values(data);
  }

  async findRefreshToken(tokenHash: string, userId: string) {
    const [refreshToken] = await this.db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.tokenHash, tokenHash),
          eq(refreshTokens.userId, userId),
          gt(refreshTokens.expiresAt, new Date()),
          eq(refreshTokens.revoked, false),
        ),
      );

    return refreshToken;
  }

  async revokeRefreshToken(tokenHash: string, userId: string) {
    await this.db
      .update(refreshTokens)
      .set({
        revoked: true,
      })
      .where(
        and(
          eq(refreshTokens.tokenHash, tokenHash),
          eq(refreshTokens.userId, userId),
          eq(refreshTokens.revoked, false),
        ),
      );
  }

  async revokeAllUserRefreshToken(userId: string) {
    await this.db
      .update(refreshTokens)
      .set({
        revoked: true,
      })
      .where(
        and(eq(refreshTokens.userId, userId), eq(refreshTokens.revoked, false)),
      );
  }
}
