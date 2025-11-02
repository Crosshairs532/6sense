import winston from "winston";
import fs from "node:fs";
import path from "node:path";
import { configFiles } from ".";
const logDir = "logs";
// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Log format - time stamp + level + message
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger
const logger = winston.createLogger({
  level: `${configFiles?.logging_level}`,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
  ),
  // Define transports - where to send the messages
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize({ all: true }), // colorize everything
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }),

    // Where to send Error files
    new winston.transports.File({
      filename: path.join(
        logDir,
        `${new Date().toISOString().slice(0, 10)}.log`
      ),
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level.toUpperCase()}]: ${message}`
        )
      ),
    }),

    // All logs - infos, errors, debug, etc.
    new winston.transports.File({
      filename: path.join(
        logDir,
        `${new Date().toISOString().slice(0, 10)}.log`
      ),
      format: logFormat,
    }),
  ],
});

export default logger;
