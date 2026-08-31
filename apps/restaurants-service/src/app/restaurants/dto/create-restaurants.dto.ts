import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRestaurantsDto
  implements RESTAURANTS.CreateRestaurantRequest
{
  @IsUUID()
  ownerId: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  description: string = null;

  @IsOptional()
  @IsString()
  phone: string = null;
}
