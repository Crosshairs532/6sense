import express from "express";
import morgan from "morgan";
import logger from "./app/config/logger";
import cors from "cors";
import router from "./app/routes";

const app = express();
app.use(express.json());
app.use(cors());
// Middlewares
// app.use(morgan("combined" as any, { stream: logger?.stream as any }));

app.get("/", (req, res) => {
  return res.send("6Sense Backend Intern Task Running...");
});
app.use("/api/v1", router);

export default app;
