import express, { Request, Response } from 'express';
import { validateDocument } from '../validation';
import { Document } from '../models';
import { logger } from '../middlewares';


const createDocument = async (req: Request, res: Response) => {
  const { error, value } = validateDocument(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { title, description, type, creationDate, authorId } = value;

    if (!title || !description || !type || !creationDate || !authorId) {
      return res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }
    if (!req.file) {
      return res.status(400).json({ message: "A file must be included in the request." });
    }

    const newDocument = await Document.create({
      title,
      description,
      file: req.file.path,
      senderId: req.body.userId,
      receiverId: req.body.receiverId,
    });
    res.status(201).json(newDocument);
  } catch(error) {
    console.error(error);
     res.status(500).json({ message: "Erreur lors de la création du document."});
  }
}

const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Document.findAll();
    return res.status(200).json(documents);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des documents"});
  }
}

const getDocumentById = async (req: Request, res: Response) => {
  try {
    const documentId = req.params.id;
    const document = await Document.findByPk(documentId);
    if (document !== null) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: "Document non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la recherche du document"});
  }
}

const updateDocument = (req: Request, res: Response) => {
  
}


const deleteDocument = async (req: Request, res: Response) => {
  try {
    const documentId = req.params.id;
    const document = await Document.findByPk(documentId);
    if (document !== null) {
      await document.destroy();
      res.status(200).json({ message: "Supression du document effectuée"});
    } else {
      res.status(404).json({ message: "Document non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontrée en essayant de supprimer le document"});
  }
}

export { createDocument, getAllDocuments, getDocumentById, updateDocument, deleteDocument };