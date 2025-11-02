import { Server } from "http";
import app from "./app";
import logger from "./app/config/logger";
import { configFiles } from "./app/config";

const mongoose = require("mongoose");

let server: Server;

const main = async () => {
  try {
    server = app.listen(3000, () => {
      logger.info("Server is running on port 3000");
    });
    await mongoose.connect(configFiles?.mongodb_url as string);
    logger.info("Connected to MongoDB successfully");
  } catch (err) {
    logger.error("Error connecting to MongoDB:", err);
  }
};

main();

// for asynchronous  behavior
process.on("unhandledRejection", () => {
  logger.info(`UnhandledRejection is detected, shutting down server....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//  for synchronous behavior
process.on("uncaughtRejection", () => {
  logger.info(`UnCaughtRejection is detected, shutting down server....`);
  process.exit(1);
});
