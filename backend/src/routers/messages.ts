/**
 * Routes pour la gestion des messages.
 */

import { Router, Request, Response } from "express";
import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from '../controllers';

export const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK messages' } );
})
router.post('/', createMessage); 
router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);