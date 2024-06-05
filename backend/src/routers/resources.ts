/**
 * Routes pour la gestion des ressources.
 */
import express, { Router, Request, Response } from "express";
import { createResource, deleteResource, getAllResources, getResourceById, updateResource } from '../controllers';

export const router = Router();

//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK resources'} );
//})
//router.post('/', isAuth, createResource); 
router.post('/', createResource); 
router.get('/', getAllResources);
router.get('/:id', getResourceById);
//router.put('/:id', isAuth, updateResource);
router.put('/:id', updateResource);
//router.delete('/:id', isAuth, deleteResource);
router.delete('/:id', deleteResource);