
import { Router, Request, Response } from "express";
import { createMessage, deleteMessage, getAllMessages, getMessageById, updateMessage } from '../controllers';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK messages' } );
})

router.post('/', (req: Request, res: Response) => {
  const { fileAttachment } = req.body;
  createMessage(req, res, fileAttachment);
});

router.put('/:id', (req: Request, res: Response) => {
  const { fileAttachment } = req.body;
  updateMessage(req, res, fileAttachment);
});

router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.delete('/:id', deleteMessage);