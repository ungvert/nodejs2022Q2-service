import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoggingService } from '../services/logging.service';

@Catch()
export class AllExceptionsFilter<T> extends BaseExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {
    super();
  }

  catch(exception: T, host: ArgumentsHost) {
    const isUnexpectedError = !(exception instanceof HttpException);
    if (isUnexpectedError) {
      // handled in interceptor
    } else {
      this.loggingService.log(`Response status code: ${exception.getStatus()}`);
      this.loggingService.error(exception);
      super.catch(exception, host);
    }
  }
}
