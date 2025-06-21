import fs from 'fs';
import path from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  meta?: any;
}

class Logger {
  private logLevel: LogLevel;
  private logDir: string;

  constructor() {
    this.logLevel = this.getLogLevel();
    this.logDir = path.join(process.cwd(), 'logs');
    this.ensureLogDirectory();
  }

  private getLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL?.toUpperCase() || 'INFO';
    return LogLevel[level as keyof typeof LogLevel] ?? LogLevel.INFO;
  }

  private ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = { timestamp, level, message };
    
    if (meta) {
      logEntry.meta = meta;
    }

    return JSON.stringify(logEntry);
  }

  private writeToFile(level: string, message: string) {
    const date = new Date().toISOString().split('T')[0];
    const filename = path.join(this.logDir, `${date}.log`);
    
    fs.appendFileSync(filename, message + '\n');
  }

  private log(level: LogLevel, levelName: string, message: string, meta?: any) {
    if (level > this.logLevel) return;

    const formattedMessage = this.formatMessage(levelName, message, meta);
    
    // Console output with colors
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[90m'  // Gray
    };
    
    const reset = '\x1b[0m';
    const color = colors[levelName as keyof typeof colors] || '';
    
    console.log(`${color}[${levelName}]${reset} ${message}`, meta || '');
    
    // File output
    if (process.env.NODE_ENV === 'production') {
      this.writeToFile(levelName, formattedMessage);
    }
  }

  error(message: string, meta?: any) {
    this.log(LogLevel.ERROR, 'ERROR', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log(LogLevel.WARN, 'WARN', message, meta);
  }

  info(message: string, meta?: any) {
    this.log(LogLevel.INFO, 'INFO', message, meta);
  }

  debug(message: string, meta?: any) {
    this.log(LogLevel.DEBUG, 'DEBUG', message, meta);
  }

  // Request logging middleware
  requestLogger() {
    return (req: any, res: any, next: any) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        const { method, originalUrl, ip } = req;
        const { statusCode } = res;
        
        const message = `${method} ${originalUrl} ${statusCode} ${duration}ms`;
        const meta = { ip, userAgent: req.get('User-Agent') };
        
        if (statusCode >= 400) {
          this.warn(message, meta);
        } else {
          this.info(message, meta);
        }
      });
      
      next();
    };
  }
}

export const logger = new Logger();