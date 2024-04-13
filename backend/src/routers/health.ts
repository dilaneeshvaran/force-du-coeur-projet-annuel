/**
 * Routes associées aux actualités pour Force du Coeur.
 */

import { Router, Request, Response } from "express";
import { timeZoneFormatter } from "../middlewares";

export const router = Router();
router.use(timeZoneFormatter);

// récupérer l'heure de soumission de la requête
router.get('/', (req: Request, res: Response) => {
    //throw new Error('App Error');
    const formattedDate = res.locals.formatTime(new Date());
    res.send( { message: 'OK', formattedDate } );
})