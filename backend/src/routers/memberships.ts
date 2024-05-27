/**
 * Routes pour la gestion les espaces membres.
 */

import { Router, Request, Response } from "express";
import { createMembership, deleteMembership, getAllMemberships, getMembershipById, updateMembership } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();


//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK memberships' } );
//})
//router.post('/', isAuth, createMembership); 
router.post('/', createMembership); 
router.get('/', getAllMemberships);
router.get('/:id', getMembershipById);
//router.put('/:id', isAuth, updateMembership);
router.put('/:id', updateMembership);
//router.delete('/:id', isAuth, deleteMembership);
router.delete('/:id', deleteMembership);