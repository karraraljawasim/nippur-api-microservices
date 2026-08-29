import { IsUUID } from 'class-validator';

export class GetOrderWithItemsDto {
  @IsUUID()
  orderId: string;

  @IsUUID()
  userId: string;
}
