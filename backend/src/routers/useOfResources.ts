/**
 * Routes pour les évènements de Force du Coeur.
 */

import { Router, Request, Response } from "express";

export const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK useOfResources' } );
})