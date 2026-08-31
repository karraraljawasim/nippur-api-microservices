import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { IsUUID } from 'class-validator';

export class DeleteMenuItemDto implements RESTAURANTS.DeleteMenuItemRequest {
  @IsUUID()
  restaurantId: string;
  @IsUUID()
  menuItemId: string;

  @IsUUID()
  userId: string;
}
