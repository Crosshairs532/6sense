import express from "express";
import morgan from "morgan";
import logger from "./app/config/logger";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalError from "./app/middlewares/GlobalError";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("6Sense Backend Intern Task Running...");
});
// all routes here
app.use("/api/v1", router);
app.use(globalError);
app.use(notFound);
export default app;
