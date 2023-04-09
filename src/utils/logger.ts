import expressWinston from 'express-winston'
import { Request, Response } from 'express'
import winston, { format, transports } from 'winston'
import combine = format.combine

const defaultOptions = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  statusLevels: false, // default value
  level(req: Request, res: Response) {
    let level = ''
    if (res.statusCode >= 100) {
      level = 'info'
    }
    if (res.statusCode >= 400) {
      level = 'warn'
    }
    if (res.statusCode >= 500) {
      level = 'error'
    }
    // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
    if (res.statusCode === 401 || res.statusCode === 403) {
      level = 'critical'
    }
    return level
  },
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(
      ({ level, message }) =>
        `${level} [${new Date().toISOString()}] ${message}`,
    ),
  ),
  meta: false, // optional: control whether you want to log the metadata about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms {{req.ip}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute(req: Request, res: Response) {
    return false
  }, // optional: allows to skip some log messages based on request and/or response
}

export const logger = expressWinston.logger({
  ...defaultOptions,
})

export const errorLogger = expressWinston.errorLogger({
  ...defaultOptions,
})

export const consoleLogger = winston.createLogger({
  format: combine(
    winston.format.colorize(),
    winston.format.printf(
      ({ level, message }) =>
        `${level} [${new Date().toISOString()}] ${message}`,
    ),
  ),
  transports: [new transports.Console()],
})
