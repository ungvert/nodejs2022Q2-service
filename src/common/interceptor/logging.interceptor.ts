import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return next
      .handle()
      .pipe(
        map(() =>
          this.loggingService.log(
            `Response status code: ${response.statusCode}`,
          ),
        ),
      );
  }
}
