import { IsEmail, IsString, MinLength } from 'class-validator';
import { AUTH } from '@nippur-api-microservice/shared-contracts';

export class RegisterUserDto implements AUTH.RegisterUserRequest {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
