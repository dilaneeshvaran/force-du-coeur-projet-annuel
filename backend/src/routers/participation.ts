import express, { Router, Request, Response } from "express";
import { isUserParticipating,createParticipation, deleteParticipation, getAllParticipations, getParticipationById, getParticipationByEventId } from '../controllers';

export const router = Router();

router.post('/', createParticipation); 
router.get('/', getAllParticipations);
router.get('/:id', getParticipationById);
router.get('/event/:id', getParticipationByEventId);
router.delete('/:id', deleteParticipation);
router.get('/user/:userId/event/:eventId', isUserParticipating);