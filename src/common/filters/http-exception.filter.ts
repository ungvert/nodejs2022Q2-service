import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { StatusCodes } from 'http-status-codes';

@Catch()
export class AllExceptionsFilter<T> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const responce = context.getResponse();

    const isUnexpectedError = !(exception instanceof HttpException);
    if (isUnexpectedError) {
      responce.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    } else {
      super.catch(exception, host);
    }
  }
}
