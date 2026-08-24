import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantByIdDto {
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
