import { IsNotEmpty, IsString } from 'class-validator';
import { USERS } from '@nippur-api-microservice/shared-contracts';

export class CreateUserDto implements USERS.CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  name: string;
}
