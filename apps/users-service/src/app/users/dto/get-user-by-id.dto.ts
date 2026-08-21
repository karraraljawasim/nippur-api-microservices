import { USERS } from '@nippur-api-microservice/shared-contracts';
import { IsUUID } from 'class-validator';

export class GetUserByIdDto implements USERS.GetUserByIdRequest {
  @IsUUID()
  userId: string;
}
