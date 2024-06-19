/**
 * Routes pour gérer les évènements.
 */

import express, { Router, Request, Response } from "express";
import { getNonMembersOnlyEvents,createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../controllers';

export const router = Router();

//router.post('/', isAuth, createEvent);
router.post('/', createEvent); 
router.get('/', getAllEvents);
router.get('/nonMembersOnly', getNonMembersOnlyEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
//router.delete('/:id', isAuth, deleteEvent);
router.delete('/:id', deleteEvent);

