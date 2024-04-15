/**
 * Routes pour la gestion des choix associés aux votes.
 */

import { Router, Request, Response } from "express";
import { createChoice, deleteChoice, getAllChoices, getChoiceById, updateChoice } from '../controllers';
import { isAuth } from "../middlewares";
export const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK choices' } );
})
router.post('/', isAuth, createChoice); 
router.get('/', getAllChoices);
router.get('/:id', getChoiceById);
router.put('/:id', isAuth, updateChoice);
router.delete('/:id', isAuth, deleteChoice);