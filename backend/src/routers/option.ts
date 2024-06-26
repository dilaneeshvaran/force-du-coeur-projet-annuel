/**
 * Routes for managing options associated with votes.
 */

import { Router, Request, Response } from "express";
import {getOptionsByVoteId, createOption, deleteOption, getAllOptions, getOptionById, updateOption } from '../controllers';
export const router = Router();

router.post('/', createOption); 
router.get('/', getAllOptions);
router.get('/:voteId', getOptionsByVoteId);
router.put('/:id', updateOption);
router.delete('/:id', deleteOption);
