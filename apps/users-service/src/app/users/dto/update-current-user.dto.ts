import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { USERS } from '@nippur-api-microservice/shared-contracts';

export class UpdateCurrentUserDto implements USERS.UpdateCurrentUserRequest {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
