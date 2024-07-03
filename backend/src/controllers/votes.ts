import express, { Request, Response } from 'express';
import { validateVote } from '../validation';
import { Vote } from '../models';
import { logger } from '../middlewares';
import cron from 'node-cron'; 

cron.schedule('0 * * * *', async () => {
  console.log('Running a task every hour');

  try {
    const votesToUpdate = await Vote.findAll({
      where: {
        endDate: {
          lt: new Date(), // 'lt' : "less than"
        },
        status: {
          ne: 'closed', // 'ne' : "not equal"
        },
      },
    });

    for (const vote of votesToUpdate) {
      vote.status = 'closed';
      await vote.save();
      console.log(`Vote avec  l'ID ${vote.id} est déja fermé`);
    }

    console.log(`Total de  ${votesToUpdate.length} ont été mis a jour`);
  } catch (error) {
    console.error('erreur de la mise a jour du vote:', error);
  }
});

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

const updateVote = async (req: Request, res: Response) => {
  try {
    const voteId = req.params.id;
    const { title, description, startDate, endDate, votingType, ongoingRound, votingMethod, status, createdBy, voterId } = req.body;

    const vote = await Vote.findByPk(voteId);
    if (vote !== null) {
      if (title !== undefined) vote.title = title;
      if (description !== undefined) vote.description = description;
      if (startDate !== undefined) vote.startDate = new Date(startDate);
      if (endDate !== undefined) vote.endDate = new Date(endDate);
      if (votingType !== undefined) vote.votingType = votingType;
      if (ongoingRound !== undefined) vote.ongoingRound = ongoingRound;
      if (votingMethod !== undefined) vote.votingMethod = votingMethod;
      if (status !== undefined) vote.status = status;
      if (createdBy !== undefined) vote.createdBy = createdBy;
      if (voterId !== undefined) vote.voterId = voterId;

      await vote.save();
      res.status(200).json(vote);
    } else {
      res.status(404).json({ message: "Vote not found." });
    }
  } catch (error) {
    console.error('Error updating vote:', error);
    res.status(500).json({ message: "Error updating the vote." });
  }
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