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
    const { label, voteId } = value;

    if ( !label || !voteId) {
      res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }

    const newOption = await Option.create({ label, voteId });
    res.status(201).json(newOption);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'option."});
  }
}

const getAllOptions = async (req: Request, res: Response) => {
  try {
    const options = await Option.findAll();
    res.json(options);
  } catch (error: any) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: "Erreur lors de la récupération des options.", error: error.message });
    } else {
      res.status(500).json({ message: "Erreur lors de la récupération des options." });
    }
  }
};

const getOptionById = async (req: Request, res: Response) => {
  try {
    const options = await Option.findAll();
    return res.status(200).json(options);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des options." });
  }
}

const updateOption = async (req: Request, res: Response) => {
  try {
    const optionId = req.params.id;
    const { id, label, voteId, votes } = req.body;

    const option = await Option.findByPk(optionId);
    if (option !== null) {
      option.id = id;
      option.label = label;
      option.voteId = voteId;
      option.votes = votes;

      await option.save();
      res.status(200).json(option);
    } else {
      res.status(404).json({ message: "Option non retrouvée"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur rencontrée en essayant de modifier l'option"});
  }
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

const getOptionsByVoteId = async (req: Request, res: Response) => {
  try {
    const voteId = req.params.voteId;
    const options = await Option.findAll({ where: { voteId } });

    if (options.length > 0) {
      res.status(200).json(options);
    } else {
      res.status(404).json({ message: "No options found for this voteId" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while trying to retrieve options" });
  }
}

export {getOptionsByVoteId, createOption, getAllOptions, getOptionById, updateOption, deleteOption };