import { Request, Response } from 'express';
import { Document } from '../models';
import * as fs from 'fs';
import * as path from 'path';

export async function uploadDocument(req: Request, res: Response) {
    const { title, description, senderId, receiverId } = req.body;
    if (!req.file) {
        res.status(400).json({ error: 'No file was attached to the request.' });
        return;
    }
    if (!senderId) { 
        res.status(400).json({ error: 'senderId is missing.' });
        return;
    }
    const file = req.file.path;
    const newDocument = await Document.create({
        title,
        description,
        file,
        senderId: senderId,
        receiverId: receiverId,
    });

    res.json(newDocument);
}

export async function downloadDocument(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const document = await Document.findByPk(id);
        if (!document) {
            res.status(404).json({ error: 'Document not found.' });
            return;
        }
        const filePath = path.join(__dirname, '..', document.file);
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ error: 'File not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while trying to download the file.' });
    }
}