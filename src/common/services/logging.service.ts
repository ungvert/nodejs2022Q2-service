import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();

    process.on('uncaughtException', (err, origin) => {
      this.error(`Uncaught exception: ${err} ${origin}`);
    });
    process.on('unhandledRejection', (reason, promise) => {
      this.error(`Unhandled rejection: ${reason} `);
    });

    /**
     * You can test logging of exception handlers with this 2 uncommented lines:
     */
    // setTimeout(
    //   () => Promise.reject(new Error('unhandledRejection test')),
    //   5000,
    // );
    // setTimeout(() => {
    //   throw new Error('uncaughtException test');
    // }, 5000);
  }
}
