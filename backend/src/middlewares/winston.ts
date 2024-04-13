import winston from 'winston';
import { tz } from 'moment-timezone';

/**
 * Middleware pour enregistrer les informations de requête dans la console.
 * 
 */
const logger = winston.createLogger ({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: () => tz('Europe/Paris').format() }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: './logs/index.log'}),
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    //new winston.transports.Console() --> afficher l'IP de l'utilisateur ayant lanc" une requête dans la console
  ]
});

export { logger };
