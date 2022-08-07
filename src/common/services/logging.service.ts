import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { FileHandle, open } from 'fs/promises';
import { dirname, join } from 'path';
import { appendFile, readdir, mkdir, createWriteStream } from 'fs';

const logDirname = join(dirname(__dirname), 'logs');

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logFolder = logDirname;
  private readonly logFileMaxSize = 1024;

  private logFilePath: string | null = null;
  private errorLogFilePath: string | null = null;

  constructor() {
    super();

    this.logUncaughtAndUnhandledEvents();

    const now = Date.now();
    this.logFilePath = join(this.logFolder, `${now}.log`);
    this.errorLogFilePath = join(this.logFolder, `${now}.error.log`);

    mkdir(logDirname, { recursive: true }, (err) => console.log(err));
    // setTimeout(() => console.log('this.logFilePath', this.logFilePath), 1000);
  }

  writeLogFile(message: any) {
    appendFile(this.logFilePath, String(message), { flag: 'a' }, (err) =>
      console.error(err),
    );
  }
  writeErrorFile(message: any) {
    appendFile(this.errorLogFilePath, String(message), { flag: 'a' }, (err) =>
      console.error(err),
    );
  }

  log(message: any, ...optionalParams: [...any, string?]) {
    super.log(message, ...optionalParams);
    this.writeLogFile(message);
  }
  error(message: any, ...optionalParams: [...any, string?]) {
    super.error(message, ...optionalParams);
    this.writeErrorFile(message);
  }
  warn(message: any, ...optionalParams: [...any, string?]) {
    super.warn(message, ...optionalParams);
    this.writeLogFile(message);
  }
  debug(message: any, ...optionalParams: [...any, string?]) {
    super.debug(message, ...optionalParams);
    this.writeLogFile(message);
  }
  verbose(message: any, ...optionalParams: [...any, string?]) {
    super.verbose(message, ...optionalParams);
    this.writeLogFile(message);
  }

  logUncaughtAndUnhandledEvents() {
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
