import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { error } from './common.response';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    // 先捕获http异常
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json(
        error(exception.message, {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
        }),
      );
    } else {
      // 后捕获代码异常
      response.status(500).json(
        error(String(exception), {
          statusCode: 500,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
        }),
      );
    }
  }
}
