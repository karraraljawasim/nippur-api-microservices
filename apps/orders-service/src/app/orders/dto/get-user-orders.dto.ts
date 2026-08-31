import { IsUUID } from 'class-validator';

export class GetUserOrdersDto {
  @IsUUID()
  userId: string;
}
