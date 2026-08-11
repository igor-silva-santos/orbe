import * as fs from 'fs';
import * as path from 'path';

const logToFile = process.env.LOG_TO_FILE === 'true' || process.env.SYNC_LOG_TO_FILE === 'true';
const isProduction = process.env.NODE_ENV === 'production';
const MAX_BUFFER_LINES = 20_000;
const MAX_SYNC_BUFFER_LINES = 15_000;

const SYNC_LOG_PATTERN =
  /sync|sincroniz|⏭️|⏱️|resumo do lote|fase '|pulad|ignorad|checkpoint|filmes|series|animes|jogos|premios|retomando|eta/i;

let logFilePath: string | undefined;

if (logToFile) {
  const logDirectory = path.join(__dirname, '..', '..', 'logs');
  logFilePath = path.join(logDirectory, 'sync.log');

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }
}

const logBuffer: string[] = [];
const syncLogBuffer: string[] = [];

function appendToBuffer(buffer: string[], line: string, maxLines: number): void {
  buffer.push(line);
  if (buffer.length > maxLines) {
    buffer.shift();
  }
}

function writeToFile(logMessage: string): void {
  if (!logToFile || !logFilePath) return;

  fs.appendFile(logFilePath, logMessage + '\n', (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
}

const log = (...args: any[]) => {
  const level =
    typeof args[0] === 'string' &&
    ['info', 'warn', 'error', 'debug'].includes(args[0].toLowerCase())
      ? args.shift().toLowerCase()
      : 'info';
  const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const message = args
    .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
    .join(' ');
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  appendToBuffer(logBuffer, logMessage, MAX_BUFFER_LINES);
  if (SYNC_LOG_PATTERN.test(message)) {
    appendToBuffer(syncLogBuffer, logMessage, MAX_SYNC_BUFFER_LINES);
  }

  if (level === 'error') {
    console.error(logMessage);
  } else if (level === 'warn') {
    console.warn(logMessage);
  } else {
    console.log(logMessage);
  }

  writeToFile(logMessage);
};

export function getLogBuffer(): string {
  return logBuffer.join('\n');
}

export function getSyncLogBuffer(): string {
  return syncLogBuffer.join('\n');
}

export function getLogBufferMeta() {
  return {
    totalLines: logBuffer.length,
    syncLines: syncLogBuffer.length,
    maxTotalLines: MAX_BUFFER_LINES,
    maxSyncLines: MAX_SYNC_BUFFER_LINES,
    fileLogging: Boolean(logToFile && logFilePath),
    filePath: logFilePath ?? null,
  };
}

export const logger = {
  info: (...args: any[]) => log('info', ...args),
  warn: (...args: any[]) => log('warn', ...args),
  error: (...args: any[]) => log('error', ...args),
  debug: (...args: any[]) => log('debug', ...args),
};
