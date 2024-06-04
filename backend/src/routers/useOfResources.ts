/**
 * Routes pour la gestion des diverses utilisations des ressources.
 */
import express, { Router, Request, Response } from "express";
import { createuseOfResource, deleteuseOfResource, getAlluseOfResources, getuseOfResourceById, updateuseOfResource } from '../controllers';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK useOfResources'} );
})
router.post('/', createuseOfResource); 
router.get('/', getAlluseOfResources);
router.get('/:id', getuseOfResourceById);
router.put('/:id', updateuseOfResource);
router.delete('/:id', deleteuseOfResource);