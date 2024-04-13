/**
 * Routes pour gérer les missions de Force de Coeur.
 */

import express, { Router, Request, Response } from "express";
import { createMission, deleteMission, getAllMissions, getMissionById, updateMission } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK missions'} );
})
router.post('/', isAuth, createMission); 
router.get('/', getAllMissions);
router.get('/:id', getMissionById);
router.put('/:id', isAuth, updateMission);
router.delete('/:id', isAuth, deleteMission);

