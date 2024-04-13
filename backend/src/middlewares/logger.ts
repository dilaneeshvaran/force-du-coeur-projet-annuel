import { Request, Response, NextFunction } from 'express';
import { logger } from './winston';

/**
 * Middleware pour enregistrer les informations de requête dans la console.
 * 
 */
export function winston(req: Request, res: Response, next: NextFunction ) {
  logger.info(`IP : ${req.ip}`);
  next();
}
