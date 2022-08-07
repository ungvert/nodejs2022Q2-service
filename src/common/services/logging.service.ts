import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  log(message: any, ...optionalParams: [...any, string?]) {
    super.log(message, optionalParams);
  }
}
