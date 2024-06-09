/**
 * Routes pour gérer les votes effectués par les membres.
 */

import express, { Router, Request, Response } from "express";
import { createVote, deleteVote, getAllVotes, getVoteById, updateVote, getChoicesByVoteId } from '../controllers';

export const router = Router();

//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK votes'} );
//})
//router.post('/', isAuth, createVote); 
router.post('/', createVote); 
router.get('/', getAllVotes);
router.get('/:id', getVoteById);
router.get('/vote/:voteId/choices', getChoicesByVoteId);
router.put('/:id', updateVote);
//router.put('/:id', isAuth, updateVote);
router.delete('/:id', deleteVote);