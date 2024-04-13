/**
 * Routes pour la gestion des messages.
 */

import { Router, Request, Response } from "express";
import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK messages' } );
})
router.post('/', isAuth, createMessage); 
router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.put('/:id', isAuth, updateMessage);
router.delete('/:id', isAuth, deleteMessage);