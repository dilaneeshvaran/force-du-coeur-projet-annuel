import express, { Router } from "express";
import { createAlert, deleteAlert, getAllAlerts, getAlertById, updateAlert } from '../controllers';

export const router = Router();

router.post('/', createAlert);
router.get('/', getAllAlerts);
router.get('/:id', getAlertById);
router.put('/:id', updateAlert);
router.delete('/:id', deleteAlert);