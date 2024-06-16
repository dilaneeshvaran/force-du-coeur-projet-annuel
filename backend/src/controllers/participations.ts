import express, { Request, Response } from 'express';
import { validateParticipation } from '../validation'; 
import { Participation } from '../models';
import { logger } from '../middlewares';

const createParticipation = async (req: Request, res: Response) => {
  const { error, value } = validateParticipation(req.body);
  if (error) {
    logger.error(error.details[0].message);
    res.status(400).json({ message: error.details[0].message });
  }
  
  try {
    const { userId, eventId } = value;
    
    if (!userId || !eventId) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }
  
    const newParticipation = await Participation.create({
      userId,
      eventId,
    });
    res.status(201).json(newParticipation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la participation."});
  }}

const getAllParticipations = async (req: Request, res: Response) => {
  try {
    const participations = await Participation.findAll();
    return res.status(200).json(participations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des participations." });
  }
}

const isUserParticipating = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const eventId = req.params.eventId;
    const participation = await Participation.findOne({ where: { userId, eventId } });
    res.status(200).json({ isParticipating: participation !== null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while trying to check user participation." });
  }
}

const getParticipationById = async (req: Request, res: Response) => {
  try {
    const participationId = req.params.id;
    const participation = await Participation.findByPk(participationId);
    if (participation !== null) {
      res.status(200).json(participation);
    } else {
      res.status(404).json({ message: "Participation non retrouvée"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Erreur lors de la recherche de la participation"});
  }
}

const getParticipationByEventId = async (req: Request, res: Response) => {
    try {
      const eventId = req.params.id;
      const participations = await Participation.findAll({ where: { eventId } });
      if (participations !== null && participations.length > 0) {
        res.status(200).json(participations);
      } else {
        res.status(404).json({ message: "No participations found for this event"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Error while searching for the participations"});
    }
  }

const deleteParticipation = async (req: Request, res: Response) => {
  try {
    const participationId = req.params.id;
    const participation = await Participation.findByPk(participationId);
    if (participation !== null) {
      await participation.destroy();
      res.status(200).json({ message: "Supression de la participation réussi"});
    } else {
      res.status(404).json({ message: "Participation non retrouvée"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer la participation"});
  }
}

export {isUserParticipating, getParticipationByEventId, createParticipation, getAllParticipations, getParticipationById, deleteParticipation };