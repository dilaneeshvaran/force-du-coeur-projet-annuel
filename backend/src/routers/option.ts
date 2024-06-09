/**
 * Routes for managing options associated with votes.
 */

import { Router, Request, Response } from "express";
import { createOption, deleteOption, getAllOptions, getOptionById, updateOption } from '../controllers';
export const router = Router();

router.post('/', createOption); 
router.get('/', getAllOptions);
router.get('/:id', getOptionById);
router.put('/:id', updateOption);
router.delete('/:id', deleteOption);