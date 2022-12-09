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
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = exception.getResponse();
    const message = typeof msg === 'string' ? msg : msg['message'];
    response.status(status).json(
      error(message, {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
      }),
    );
  }
}
