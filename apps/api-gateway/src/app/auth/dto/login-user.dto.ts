import { IsEmail, IsString, MinLength } from 'class-validator';
import { AUTH } from '@nippur-api-microservice/shared-contracts';

export class LoginUserDto implements AUTH.LoginUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
