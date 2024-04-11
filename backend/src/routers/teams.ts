/**
 * Routes pour les évènements de Force du Coeur.
 */

import express, { Router, Request, Response } from "express";
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();

//router.get('/', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//})

//router.get('/:id', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//}) --> récupérer une équipe précise

router.post('/', isAuth, createTeam);
router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.put('/:id', isAuth, updateTeam);
router.delete('/:id', isAuth, deleteTeam);
