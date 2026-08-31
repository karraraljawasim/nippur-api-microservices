import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMenuItemDto implements RESTAURANTS.UpdateMenuItemRequest {
  @IsUUID()
  restaurantId: string;
  @IsUUID()
  menuItemId: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
