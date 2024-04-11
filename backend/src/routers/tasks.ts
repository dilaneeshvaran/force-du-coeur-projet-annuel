/**
 * Routes pour les différentes tâches.
 */

import express, { Router, Request, Response } from "express";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();

//router.get('/', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//})

//router.get('/:id', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//}) --> récupérer une équipe précise

router.post('/', isAuth, createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', isAuth, updateTask);
router.delete('/:id', isAuth, deleteTask);
