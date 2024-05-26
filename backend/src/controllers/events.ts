import express, { Request, Response } from 'express';
import { validateEvent } from '../validation';
import { Event } from '../models';
import { logger } from '../middlewares';

const createEvent = async (req: Request, res: Response) => {
  const { error, value } = validateEvent(req.body);
  if (error) {
    res.status(400).json({ message: logger.error(error.details[0].message) });
  }
  
  try {
    const { title, description, date, location, availableSpots } = value;
    
    if (!title || !description || !date || !location || !availableSpots) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      availableSpots
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'évènement."});
  }
}

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des évènements." });
  }
}

const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);
    if (event !== null) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Evènement non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Erreur lors de la recherche de l'évènement"});
  }
}


const updateEvent = async (req: Request, res: Response) => {
  // TODO
}


const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);
    if (event !== null) {
      // supprimer l'évènement de la BDD
      await event.destroy();
      res.status(200).json({ message: "Supression de l'évènement réussi"});
    } else {
      res.status(404).json({ message: "Evènement non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer l'évènement"});
  }
}

export { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };