import express, { Request, Response } from 'express';
import { validateChoice } from '../validation';
import { Choice } from '../models';
import { logger } from '../middlewares';

const createChoice = async (req: Request, res: Response) => {
  const { error, value } = validateChoice(req.body);
  if (error) {
    res.status(400).json({ message: logger.error(error.details[0].message) });
  }

  try {
    const { label } = value;

    if (!label) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newChoice = await Choice.create({ label });
    res.status(201).json(newChoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ lessage: "Erreur lors de la création du choix."});
  }
}

const getAllChoices = (req: Request, res: Response) => {
  
}

const getChoiceById = async (req: Request, res: Response) => {
  try {
    const choices = await Choice.findAll();
    return res.status(200).json(choices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des choix." });
  }
}

const updateChoice = (req: Request, res: Response) => {
  // TODO
}


const deleteChoice = async (req: Request, res: Response) => {
  try {
    const choiceId = req.params.id;
    const choice = await Choice.findByPk(choiceId);
    if (choice !== null) {
      await choice.destroy();
      res.status(200).json({ message: "Suppression d'un choix réussie"});
    } else {
      res.status(404).json({ message: "Choix non retrouvé"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontré en essayant de supprimer le choix"});
  }
}

export { createChoice, getAllChoices, getChoiceById, updateChoice, deleteChoice };