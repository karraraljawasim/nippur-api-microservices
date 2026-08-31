import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuItemDto implements RESTAURANTS.CreateMenuItemRequest {
  @IsUUID()
  userId: string;

  @IsUUID()
  restaurantId: string;

  @IsString()
  price: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
