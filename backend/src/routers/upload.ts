import express, { Router } from 'express';
import multer from 'multer';
import { uploadDocument,downloadDocument } from '../controllers/uploadController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadDocument);
router.get('/:id', downloadDocument);

export default router;