ALTER TABLE "refresh_tokens" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ALTER COLUMN "token_hash" SET DATA TYPE text;