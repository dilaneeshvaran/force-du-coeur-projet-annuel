import express, { Request, Response } from 'express';
import { validateVote } from '../validation';
import { Vote } from '../models';
import { logger } from '../middlewares';

const createVote = async (req: Request, res: Response) => {
  const { error, value } = validateVote(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message});
  }

  try {
    console.log('Received data:', req.body);
    const { title, description, startDate, endDate, votingType, ongoingRound, votingMethod, status, createdBy, voterId } = value;

    if (!title || !description || !startDate || !endDate || !votingType || !ongoingRound || !votingMethod || !status ) {
      return res.status(400).json({ message: "Aucun champ ne doit être vide"});
    }
    
    const newVote = await Vote.create({
      title,
      description,
      startDate,
      endDate,
      votingType,
      ongoingRound,
      votingMethod,
      status,
      createdBy,
      voterId
    });
    return res.status(201).json(newVote);
  }    catch (error) {
    logger.error('Error creating vote:', error);
    return res.status(500).json({ message: "Erreur lors de la création d'un vote", error: (error as Error).message });
  }
}

const getAllVotes = async (req: Request, res: Response) => {
  try {
    const votes = await Vote.findAll();
    return res.status(200).json(votes);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des évènements"});
  }
}

const getVoteById = async (req: Request, res: Response) => {
  try {
    const voteId = req.params.id;
    const vote = await Vote.findByPk(voteId);
    if (vote !== null) {
      return res.status(200).json(vote);
    } else {
      return res.status(404).json({ message: "Membre non retrouvé"});
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Erreur lors de la recherche du membre"});
  }
}

const updateVote = (req: Request, res: Response) => {

}


const deleteVote = async (req: Request, res: Response) => {
  try {
    const voteId = req.params.id;
    const vote = await Vote.findByPk(voteId);
    if (vote !== null) {
      await vote.destroy();
      return res.status(200).json({ message: "Suppression du vote réussie"});
    } else {
      return res.status(404).json({ message: "Vote non retrouvé"});
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Erreur rencontrée en essayant de supprimer le vote"});
  }
}

export { createVote, getAllVotes, getVoteById, updateVote, deleteVote };