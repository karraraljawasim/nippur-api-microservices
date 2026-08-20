import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status as GrpcStatus } from '@grpc/grpc-js';

@Catch()
export class AllRpcExceptionsFilter implements RpcExceptionFilter {
  private readonly logger = new Logger('RpcException');

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof RpcException) {
      const error = exception.getError();
      this.logger.error(JSON.stringify(error));
      return throwError(() => error);
    }
    const message =
      exception instanceof Error ? exception.message : 'Internal Server Error';

    this.logger.error(exception instanceof Error ? exception.stack : exception);

    return throwError(() => ({
      code: GrpcStatus.INTERNAL,
      message,
    }));
  }
}
