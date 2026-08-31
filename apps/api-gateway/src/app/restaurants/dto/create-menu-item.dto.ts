import { IsOptional, IsString } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  price: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
