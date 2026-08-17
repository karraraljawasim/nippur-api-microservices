import { AUTH } from '@nippur-api-microservice/shared-contracts';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto implements AUTH.LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
