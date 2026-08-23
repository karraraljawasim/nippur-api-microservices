import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCurrentUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
