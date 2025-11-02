import { ZodObject } from "zod";
import { catchAsync } from "../utils/CatchAsynch";
import { NextFunction, Request, Response } from "express";

export const validation = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};
