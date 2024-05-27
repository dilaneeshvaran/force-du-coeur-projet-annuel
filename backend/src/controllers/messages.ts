import express, { Request, Response } from 'express';
import { validateMessage } from '../validation';
import { Message } from '../models';
import { logger } from '../middlewares';

const createMessage = async (req: Request, res: Response) => {
  const { error, value } = validateMessage(req.body);
  if (error) {
    res.status(400).json({ message: logger.error(error.details[0].message) });
  }
  
  try {
    const { content, creationDate, authorId, recipientId } = value;
    
    if (!content || !creationDate || !authorId || !recipientId) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newMessage = await Message.create({
      content,
      creationDate,
      authorId,
      recipientId,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création d'un message."});
  }
}

const getAllMessages = async (req: Request, res: Response) => {
  try {
    const message = await Message.findAll();
    return res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des messages." });
  }
}

const getMessageById = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findByPk(messageId);
    if (message !== null) {
      res.status(200).json(message);
    } else {
      res.status(404).json({ message: "Message non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Erreur lors de la recherche du message"});
  }
}

const updateMessage = (req: Request, res: Response) => {
  // TODO
}

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const messageId = req.params.id;
    const message = await Message.findByPk(messageId);
    if (message !== null) {
      // supprimer le message de la BDD
      await message.destroy();
      res.status(200).json({ message: "Supression du message réussie"});
    } else {
      res.status(404).json({ message: "Message non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer le message"});
  }
}

export { createMessage, getAllMessages, getMessageById, updateMessage, deleteMessage };