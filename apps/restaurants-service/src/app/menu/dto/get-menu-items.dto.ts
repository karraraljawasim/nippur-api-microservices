import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

export class GetMenuItemsDto implements RESTAURANTS.GetMenuItemsRequest {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('7', { each: true })
  ids: string[];
}
