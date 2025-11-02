import { Response } from "express";
type Tdata<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};
export const SendResponse = <T>(res: Response, result: Tdata<T>) => {
  return res.status(200).json({
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};
