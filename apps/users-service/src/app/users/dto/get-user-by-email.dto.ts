import { USERS } from '@nippur-api-microservice/shared-contracts';
import { IsEmail } from 'class-validator';

export class GetUserByEmailDto implements USERS.GetUserByEmailRequest {
  @IsEmail()
  email: string;
}
