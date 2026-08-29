import { IsUUID } from 'class-validator';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

export class GetAllMenuItemsDto implements RESTAURANTS.GetAllMenuItemsRequest {
  @IsUUID()
  restaurantId: string;
}
