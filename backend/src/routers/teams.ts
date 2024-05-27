/**
 * Routes pour les gérer les équipes composées de plusieurs membres.
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

//router.post('/', isAuth, createTeam);
router.post('/', createTeam);
router.get('/', getAllTeams);
router.get('/:id', getTeamById);
//router.put('/:id', isAuth, updateTeam);
router.put('/:id', updateTeam);
//router.delete('/:id', isAuth, deleteTeam);
router.delete('/:id', deleteTeam);
