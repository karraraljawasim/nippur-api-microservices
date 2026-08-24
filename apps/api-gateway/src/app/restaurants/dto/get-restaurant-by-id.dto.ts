import { IsUUID } from 'class-validator';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

export class GetRestaurantByIdDto
  implements RESTAURANTS.GetRestaurantByIdRequest
{
  @IsUUID()
  restaurantId: string;
}
