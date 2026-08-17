import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { USERS } from '@nippur-api-microservice/shared-contracts';

describe('UsersController', () => {
  let controller: UsersController;

  const mockClientGrpc = {
    getService: jest.fn().mockReturnValue({
      createUser: jest.fn(),
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: USERS.USERS_PACKAGE_NAME,
          useValue: mockClientGrpc,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
