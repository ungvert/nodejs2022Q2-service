import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { join } from 'path';
import { appendFile, mkdir, statSync } from 'fs';
import { logDirname } from '../../main';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logFolder = logDirname;
  private readonly logFileMaxSize =
    (+process.env.LOG_MAX_FILE_SIZE_KB || 1) * 1024;

  private logFilePath: string | null = null;
  private errorLogFilePath: string | null = null;

  constructor() {
    super();

    this.logUncaughtAndUnhandledEvents();

    const now = Date.now();
    this.logFilePath = join(this.logFolder, `${now}.log`);
    this.errorLogFilePath = join(this.logFolder, `${now}.error.log`);

    mkdir(logDirname, { recursive: true }, (err) => console.log(err));

    this.setLogLevels(logLevels);
  }

  formatMessageForFile(message: unknown, logLevel?: LogLevel) {
    const pidMessage = `[${process.pid}]`;
    const timestampDiff = '';
    const formattedLogLevel = logLevel.toUpperCase().padStart(7, ' ');
    return `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${message}${timestampDiff}\n`;
  }

  fileSizeIsOk(pathToFile: string) {
    const stats = statSync(pathToFile, { throwIfNoEntry: false });
    if (!stats) return true;
    return stats.size < this.logFileMaxSize;
  }

  writeLogFile(message: any) {
    if (!this.fileSizeIsOk(this.logFilePath)) {
      const now = Date.now();
      this.logFilePath = join(this.logFolder, `${now}.log`);
    }
    appendFile(
      this.logFilePath,
      String(message),
      { flag: 'a' },
      (err) => err && console.error(err),
    );
  }
  writeErrorFile(message: any) {
    if (!this.fileSizeIsOk(this.errorLogFilePath)) {
      const now = Date.now();
      this.errorLogFilePath = join(this.logFolder, `${now}.error.log`);
    }
    appendFile(
      this.errorLogFilePath,
      String(message),
      { flag: 'a' },
      (err) => err && console.error(err),
    );
  }

  log(message: any, ...optionalParams: [...any, string?]) {
    if (!this.isLevelEnabled('log')) {
      return;
    }
    super.log(message, ...optionalParams);
    this.writeLogFile(this.formatMessageForFile(message, 'log'));
  }
  error(message: any, ...optionalParams: [...any, string?]) {
    if (!this.isLevelEnabled('error')) {
      return;
    }
    super.error(message, ...optionalParams);
    this.writeErrorFile(this.formatMessageForFile(message, 'error'));
  }
  warn(message: any, ...optionalParams: [...any, string?]) {
    if (!this.isLevelEnabled('warn')) {
      return;
    }
    super.warn(message, ...optionalParams);
    this.writeLogFile(this.formatMessageForFile(message, 'warn'));
  }
  debug(message: any, ...optionalParams: [...any, string?]) {
    if (!this.isLevelEnabled('debug')) {
      return;
    }
    super.debug(message, ...optionalParams);
    this.writeLogFile(this.formatMessageForFile(message, 'debug'));
  }
  verbose(message: any, ...optionalParams: [...any, string?]) {
    if (!this.isLevelEnabled('verbose')) {
      return;
    }
    super.verbose(message, ...optionalParams);
    this.writeLogFile(this.formatMessageForFile(message, 'verbose'));
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
    //   2000,
    // );
    // setTimeout(() => {
    //   throw new Error('uncaughtException test');
    // }, 2000);
  }
}

export const logLevels = ['error', 'warn', 'log', 'verbose', 'debug'].slice(
  0,
  +process.env.LOG_LEVEL || 5,
) as LogLevel[];
