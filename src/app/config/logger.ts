import winston from "winston";
import fs from "node:fs";
import path from "node:path";
const logDir = "logs";

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// Create logger
const logger = winston.createLogger({
  level: `${process?.env?.NODE_ENV === "dev" ? "debug" : "info"}`,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(
        logDir,
        `${new Date().toISOString().slice(0, 10)}.log`
      ),
    }),
  ],
});

// For morgan integration
(logger as any).stream = {
  write: (message?: any) => logger.info(message.trim()),
};

export default logger;
