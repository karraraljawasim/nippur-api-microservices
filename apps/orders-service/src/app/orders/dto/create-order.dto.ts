import { ArrayMinSize, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
import { ORDERS } from '@nippur-api-microservice/shared-contracts';

export class CreateOrderDto implements ORDERS.CreateOrderRequest {
  @IsUUID()
  customerId: string;

  @IsUUID()
  restaurantId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
