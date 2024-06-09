import express, { Request, Response } from 'express';
import { optionValidation } from '../validation';
import { Option } from '../models';
import { logger } from '../middlewares';

const createOption = async (req: Request, res: Response) => {
  const { error, value } = optionValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: logger.error(error.details[0].message) });
  }

  try {
    const { label } = value;

    if (!label) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newOption = await Option.create({ label });
    res.status(201).json(newOption);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'option."});
  }
}

const getAllOptions = (req: Request, res: Response) => {
  
}

const getOptionById = async (req: Request, res: Response) => {
  try {
    const options = await Option.findAll();
    return res.status(200).json(options);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des options." });
  }
}

const updateOption = (req: Request, res: Response) => {
  // TODO
}

const deleteOption = async (req: Request, res: Response) => {
  try {
    const optionId = req.params.id;
    const option = await Option.findByPk(optionId);
    if (option !== null) {
      await option.destroy();
      res.status(200).json({ message: "Suppression d'une option réussie"});
    } else {
      res.status(404).json({ message: "Option non retrouvée"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontrée en essayant de supprimer l'option"});
  }
}

export { createOption, getAllOptions, getOptionById, updateOption, deleteOption };