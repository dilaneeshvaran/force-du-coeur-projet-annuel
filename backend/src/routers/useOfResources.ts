/**
 * Routes pour la gestion des diverses utilisations des ressources.
 */
import express, { Router, Request, Response } from "express";
import { createuseOfResource, deleteuseOfResource, getAlluseOfResources, getuseOfResourceById, updateuseOfResource } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK useOfResources'} );
})
router.post('/', isAuth, createuseOfResource); 
router.get('/', getAlluseOfResources);
router.get('/:id', getuseOfResourceById);
router.put('/:id', isAuth, updateuseOfResource);
router.delete('/:id', isAuth, deleteuseOfResource);