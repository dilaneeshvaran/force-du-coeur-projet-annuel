import express, { Request, Response, NextFunction } from 'express';
import * as moment from 'moment-timezone';

export function timeZoneFormatter(req: Request, res: Response, next: NextFunction) {
  if (!req.timestamp) {
    req.timestamp = new Date().getTime();
  }
  
  const date = new Date(req.timestamp);

  const timeZone = req.query.timeZone as string || 'Europe/Paris';

  const formatTime = () => {
    return moment.tz(date, timeZone).format();
  }

  res.locals.formatTime = formatTime;

  next();
}