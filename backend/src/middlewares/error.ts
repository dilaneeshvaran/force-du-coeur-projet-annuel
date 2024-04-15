import express, { Request, Response, NextFunction } from "express";
import { logger } from "./winston";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`Oups, une erreur : ${err.message}`, {error: err});

  res.status(500).json({ error: "Une erreur est survenue. Retentez l'expérience plus tard. " });
  
  next();
}
