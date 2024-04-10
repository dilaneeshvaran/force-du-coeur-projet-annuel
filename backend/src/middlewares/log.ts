import express, { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction ) {
  console.log(`${req.ip}, ${req.timestamp}`);
  next();
}
