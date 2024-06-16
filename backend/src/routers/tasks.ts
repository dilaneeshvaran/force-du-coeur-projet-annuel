/**
 * Routes pour gérer les différentes tâches.
 */

import express, { Router, Request, Response } from "express";
import { getTasksByUserId,createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers';

export const router = Router();

//router.get('/', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//})

//router.get('/:id', (req: Request, res: Response) => {
  //res.send( { message: 'OK'} );
//}) --> récupérer une équipe précise

//router.post('/', isAuth, createTask);
router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
//router.delete('/:id', isAuth, deleteTask);
router.delete('/:id', deleteTask);
router.get('/user/:userId', getTasksByUserId);
