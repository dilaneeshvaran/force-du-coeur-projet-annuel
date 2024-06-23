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
    const { title, description, date, location, availableSpots,membersOnly,participations,quota } = value;
    
    if (!title ) {
      res.status(400).json({ message: "title peux pas etre vide"});
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      availableSpots,
      membersOnly,
      participations,
      quota
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

const getNonMembersOnlyEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll({ where: { membersOnly: false } });
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des évènements non réservés aux membres." });
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
  try {
    const eventId = req.params.id;
    const { title, date , description, location , availableSpots,membersOnly,participations,quota} = req.body;
  
    const event = await Event.findByPk(eventId);
    if (event !== null) {
      if (title !== undefined) event.title = title;
      if (date !== undefined) event.date = date;
      if (description !== undefined) event.description = description;
      if (location !== undefined) event.location = location;
      if (availableSpots !== undefined) event.availableSpots = availableSpots;
      if (membersOnly !== undefined) event.membersOnly = membersOnly;
      if (participations !== undefined) event.participations = participations;
      if (quota !== undefined) event.quota = quota;
  
      await event.save();
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    logger.error('Error creating vote:', error);
    return res.status(500).json({ message: "Erreur lors de la mise a jour d'un event", error: (error as Error).message });
  }
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

export {getNonMembersOnlyEvents, createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };