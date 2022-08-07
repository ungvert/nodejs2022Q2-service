import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  use(req: Request, res: Response, next: () => void) {
    this.loggingService.log(`Request: ${req.method} ${req.baseUrl}`);
    this.loggingService.debug(`Query params: ${JSON.stringify(req.query)}`);
    this.loggingService.debug(`Request body: ${JSON.stringify(req.body)}`);
    this.loggingService.verbose(`Response status code: ${res.statusCode}`);
    next();
  }
}
