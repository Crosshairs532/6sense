import { NextFunction, RequestHandler, Request, Response } from "express";
import logger from "../config/logger";

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      logger.error("Error caught in catchAsync:", err);
      next(err);
    });
  };
};
