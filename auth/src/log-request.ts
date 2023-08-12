import { Request, Response, NextFunction } from "express";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request: " + req.method + " " + req.originalUrl);

  next();
};
