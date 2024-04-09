/**
 * Routes pour les évènements de Force du Coeur.
 */

import express, { Router, Request, Response } from "express";
import { creerEquipe, recupererEquipeParId,recupererEquipes, mettreAJourEquipe, supprimerEquipe } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();

//router.get('/', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//})

//router.get('/:id', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//}) --> récupérer une équipe précise

router.post('/', isAuth, creerEquipe); // besoin d'être authentifié pour faire ça
router.get('/', recupererEquipes);
router.get('/:id', recupererEquipeParId);
router.put('/:id', isAuth, mettreAJourEquipe);
router.delete('/:id', isAuth, supprimerEquipe);
