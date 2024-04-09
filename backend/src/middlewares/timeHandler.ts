import express, { Request, Response, NextFunction } from 'express';

export function timeZoneFormatter(req: Request, res: Response, next: NextFunction) {
  const timestamp = req.timestamp || new Date().getTime();
  const date = new Date(timestamp);

  const timeZone = req.query.timeZone as string || 'Europe/Paris';

  const formatTime = (date: Date) => {
    const options = {
      timeZone,
      hour12: false,
      hour: '2-digit' as const,
      minute: '2-digit' as const,
      second: '2-digit' as const
    };
    return date.toLocaleString('fr-FR', options);
  }

  res.locals.formatTime = formatTime;

  next();
}