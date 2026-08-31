import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { ORDERS } from '@nippur-api-microservice/shared-contracts';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockClientGrpc = {
    getService: jest.fn().mockReturnValue({
      getUserOrders: jest.fn(),
      getOrderWithItems: jest.fn(),
      createOrder: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: ORDERS.ORDER_PACKAGE_NAME,
          useValue: mockClientGrpc,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
