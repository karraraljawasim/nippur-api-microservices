import { IsUUID } from 'class-validator';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

export class GetMenuItemByIdDto implements RESTAURANTS.GetMenuItemByIdRequest {
  @IsUUID()
  menuItemId: string;

  @IsUUID()
  restaurantId: string;
}
