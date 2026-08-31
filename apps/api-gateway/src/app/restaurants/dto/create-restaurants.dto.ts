import { IsOptional, IsString } from 'class-validator';

export class CreateRestaurantsDto {
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
