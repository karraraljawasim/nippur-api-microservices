import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

export class UpdateRestaurantByIdDto
  implements RESTAURANTS.GetRestaurantByIdRequest
{
  @IsUUID()
  userId: string;

  @IsUUID()
  restaurantId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;
}
