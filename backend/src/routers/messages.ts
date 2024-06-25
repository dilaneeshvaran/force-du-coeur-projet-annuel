
import { Router, Request, Response } from "express";
import {isMessageReplied, createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from '../controllers';

export const router = Router();



router.get('/', getAllMessages);
router.post('/', createMessage);
router.get('/:id', getMessageById);
router.delete('/:id', deleteMessage);
router.get('/:id/isReplied', isMessageReplied);
router.put('/:id', updateMessage);