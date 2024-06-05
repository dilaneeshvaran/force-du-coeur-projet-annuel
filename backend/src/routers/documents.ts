/**
 * Routes pour la gestion des documents.
 */

import { Router, Request, Response } from "express";
import { createDocument, deleteDocument, getAllDocuments, getDocumentById, updateDocument } from '../controllers';

export const router = Router();


//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK documents' } );
//})
//router.post('/', isAuth, createDocument);
router.post('/', createDocument);
router.get('/', getAllDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);
