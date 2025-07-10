import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  constructor(private readonly myContext: string) {
    super();
  }

  log(message: string, context?: string) {
    if (!context) context = this.myContext;
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    if (!stackOrContext) stackOrContext = this.myContext;
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }

  private async logToFile(entry: string) {
    const logsDirPath = [__dirname, '..', '..', 'logs'];
    const dateTime = Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Kiev',
    }).format(new Date());
    const formattedEntry = `${dateTime}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(...logsDirPath))) {
        await fsPromises.mkdir(path.join(...logsDirPath));
      }
      await fsPromises.appendFile(
        path.join(...logsDirPath, 'myLogFile.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }
}
