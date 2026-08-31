import { IsEmail, IsString, MinLength } from 'class-validator';
import { USERS } from '@nippur-api-microservice/shared-contracts';

export class CreateUserDto implements USERS.CreateUserRequest {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  passwordHash: string;
}
