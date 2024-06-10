import express, { Request, Response } from 'express';
import { validateUserVote } from '../validation'; 
import { UserVote } from '../models';
import { logger } from '../middlewares';

const createUserVote = async (req: Request, res: Response) => {
  const { error, value } = validateUserVote(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  
  const { userId, optionId } = value;
  if (!userId || !optionId) {
    return res.status(400).json({ message: "No field should be empty"});
  }

  try {
    const newUserVote = await UserVote.create({
      userId,
      optionId,
    });
    // Assuming newUserVote is a Sequelize model instance
    return res.status(201).json(newUserVote.get({ plain: true }));  // Convert to plain object to avoid circular JSON issues
  } catch (error) {
    console.error('Error while creating the user vote:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: "Error while creating the user vote.", error: error.message });
    } else {
      return res.status(500).json({ message: "Error while creating the user vote." });
    }
  }
}

const getAllUserVotes = async (req: Request, res: Response) => {
  try {
    const userVotes = await UserVote.findAll();
    return res.status(200).json(userVotes);
  } catch (error: any) {
    console.error("Failed to retrieve user votes:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const getUserVoteById = async (req: Request, res: Response) => {
  try {
    const userOptionId = req.params.id;
    const userVote = await UserVote.findByPk(userOptionId);
    if (userVote !== null) {
      res.status(200).json(userVote);
    } else {
      res.status(404).json({ message: "User vote not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error while searching for the user vote"});
  }
}

const getUserVotesByUserId = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const userVotes = await UserVote.findAll({ where: { userId } });
      if (userVotes !== null && userVotes.length > 0) {
        res.status(200).json(userVotes);
      } else {
        res.status(404).json({ message: "No user votes found for this user"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Error while searching for the user votes"});
    }
  }
  const updateUserVote = async (req: Request, res: Response) => {
    const { error, value } = validateUserVote(req.body);
    if (error) {
      logger.error(error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }
  
    try {
      const userOptionId = req.params.id;
      const userVote = await UserVote.findByPk(userOptionId);
      if (userVote !== null) {
        const { userId, optionId } = value;
        await userVote.update({ userId, optionId });
        res.status(200).json({ message: "User vote update successful"});
      } else {
        res.status(404).json({ message: "User vote not found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error encountered while trying to update the user vote"});
    }
  }
const deleteUserVote = async (req: Request, res: Response) => {
  try {
    const userOptionId = req.params.id;
    const userVote = await UserVote.findByPk(userOptionId);
    if (userVote !== null) {
      await userVote.destroy();
      res.status(200).json({ message: "User vote deletion successful"});
    } else {
      res.status(404).json({ message: "User vote not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error encountered while trying to delete the user vote"});
  }
}

export {updateUserVote,createUserVote, getAllUserVotes, getUserVoteById, deleteUserVote, getUserVotesByUserId};