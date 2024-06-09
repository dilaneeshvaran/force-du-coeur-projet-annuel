/**
 * Routes pour gérer les votes effectués par les membres.
 */

import express, { Router, Request, Response } from "express";
import { createVote, deleteVote, getAllVotes, getVoteById, updateVote } from '../controllers';

export const router = Router();

//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK votes'} );
//})
//router.post('/', isAuth, createVote); 
router.post('/', createVote); 
router.get('/', getAllVotes);
router.get('/:id', getVoteById);
router.put('/:id', updateVote);
//router.put('/:id', isAuth, updateVote);
router.delete('/:id', deleteVote);