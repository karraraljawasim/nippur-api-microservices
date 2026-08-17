import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AUTH } from '@nippur-api-microservice/shared-contracts';

describe('AuthController', () => {
  let controller: AuthController;

  const mockClientGrpc = {
    getService: jest.fn().mockReturnValue({
      login: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AUTH.AUTH_PACKAGE_NAME,
          useValue: mockClientGrpc,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
