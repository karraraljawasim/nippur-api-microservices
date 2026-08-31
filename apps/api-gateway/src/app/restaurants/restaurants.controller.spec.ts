import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RESTAURANTS } from '@nippur-api-microservice/shared-contracts';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  const mockClientGrpc = {
    getService: jest.fn().mockReturnValue({
      updateById: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      create: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RESTAURANTS.RESTAURANTS_PACKAGE_NAME,
          useValue: mockClientGrpc,
        },
      ],
    }).compile();
    controller = module.get<RestaurantsController>(RestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
