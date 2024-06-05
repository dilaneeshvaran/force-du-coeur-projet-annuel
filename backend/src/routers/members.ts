/**
 * Routes pour répertorier les membres de l'association.
 */

import express, { Router, Request, Response } from "express";
import { createMember, deleteMember, getAllMembers, getMemberById, updateMember } from '../controllers';

export const router = Router();

/*router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK members'} );
})*/

// pas encore de système d'authentification
//router.post('/', isAuth, createMember);
router.post('/', createMember);
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
//router.put('/:id', isAuth, updateMember);
router.put('/:memberId', updateMember);
//router.delete('/:id', isAuth, deleteMember);
router.delete('/:id', deleteMember);
