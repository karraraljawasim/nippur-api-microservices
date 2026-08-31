import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMenuItemDto {
  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
