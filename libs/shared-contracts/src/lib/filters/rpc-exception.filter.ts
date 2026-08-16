import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllRpcExceptionsFilter implements RpcExceptionFilter {
  private readonly logger = new Logger('RpcException');

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      this.logger.error(JSON.stringify(exception.getResponse()));
    } else if (exception instanceof Error) {
      this.logger.error(exception.stack);
    } else {
      this.logger.error(exception);
    }

    const message =
      exception instanceof Error ? exception.message : 'Internal server error';
    return throwError(() => new RpcException(message));
  }
}
