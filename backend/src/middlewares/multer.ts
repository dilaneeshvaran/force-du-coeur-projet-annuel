import express from 'express';
import multer from 'multer';
import { Document } from '../models';

const app = express(); // Define the 'app' object

// Set up multer to store files in the 'uploads' directory
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
    const { title, description, userId, receiverId } = req.body;
    if (!req.file) {
        res.status(400).json({ error: 'No file was attached to the request.' });
        return;
      }
    const file = req.file.path;
  const newDocument = await Document.create({
    title,
    description,
    file,
    senderId: userId,
    receiverId,
  });

  res.json(newDocument);
});