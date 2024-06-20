import express, { Request, Response } from 'express';
import { validateMessage } from '../validation';
import { Message } from '../models';
import { logger } from '../middlewares';

const createMessage = async (req: Request, res: Response, fileAttachment: any) => {
  const { error, value } = validateMessage(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  
  try {
    const {userId,replyAdminId,fullName,email,createdAt,senderMail,receiverMail, subject, message, type,fileAttachment,replied } = value;
    
    if (!email) {
      return res.status(400).json({ message: "email champ ne doit être vide"});
    }

    const newMessage = await Message.create({
      userId,
      replyAdminId,
      fullName,
      email,
      subject,
      message,
      type,
      fileAttachment,
      createdAt,
      senderMail,
      receiverMail,
      replied
    });
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la création d'un message."});
  }
}

const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.findAll();
    return res.status(200).json(messages);
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

const updateMessage = async (req: Request, res: Response, fileAttachment: any) => {
  try {
    const messageId = req.params.id;
    const { subject, message, type } = req.body;

    const existingMessage = await Message.findByPk(messageId);
    if (existingMessage !== null) {
      existingMessage.subject = subject;
      existingMessage.message = message;
      existingMessage.type = type;
      existingMessage.fileAttachment = fileAttachment; 
      await existingMessage.save();
      res.status(200).json(existingMessage);
    } else {
      res.status(404).json({ message: "Message non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du message"});
  }
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