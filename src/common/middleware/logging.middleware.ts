import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}
  use(req: Request, res: Response, next: () => void) {
    this.loggingService.log('url', req.baseUrl);

    console.log('url', req.url, req.originalUrl, req.baseUrl);
    console.log('q', req.query);
    console.log('b', req.body);

    console.log('resp stat', res.statusCode);

    next();
  }
}
