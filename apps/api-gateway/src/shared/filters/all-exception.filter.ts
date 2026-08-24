import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { status as GrpcStatus } from '@grpc/grpc-js';

const grpcToHttpStatus: Record<number, number> = {
  [GrpcStatus.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
  [GrpcStatus.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
  [GrpcStatus.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
  [GrpcStatus.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [GrpcStatus.ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [GrpcStatus.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
  [GrpcStatus.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = this.getMessage(exception);
    } else if (exception?.code !== undefined) {
      status =
        grpcToHttpStatus[exception.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
      message =
        exception.details || exception.message || 'Downstream service error';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message =
        exception instanceof Error
          ? exception.message
          : 'Internal server error';
    }

    if (status >= 500) {
      this.logger.error(
        message,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  private getMessage(exception: HttpException): string {
    const res = exception.getResponse();
    if (typeof res === 'string') return res;
    if (typeof res === 'object' && res !== null && 'message' in res) {
      const msg = (res as any).message;
      return Array.isArray(msg) ? msg.join(', ') : String(msg);
    }
    return exception.message;
  }
}
