import express from "express";
import morgan from "morgan";
import logger from "./app/config/logger";

const app = express();

// Middlewares
app.use(morgan("combined" as any, { stream: logger?.stream as any }));

app.get("/", (req, res) => {
  return res.send("6Sense Backend Intern Task Running...");
});

app.listen(3000, () => {
  logger.info("Server is running on port 3000");
});

export default app;
