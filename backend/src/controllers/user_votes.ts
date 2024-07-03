import express, { Request, Response } from 'express';
import { validateUserVote } from '../validation'; 
import { UserVote,Option } from '../models';
import { logger } from '../middlewares';

const createUserVote = async (req: Request, res: Response) => {
  const { error, value } = validateUserVote(req.body);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  
  const { userId, voteId, optionId } = value;
  if (!userId || !voteId || !optionId) {
    return res.status(400).json({ message: "No field should be empty"});
  }

  try {
    const newUserVote = await UserVote.create({
      userId,
      voteId,
      optionId
    });
    return res.status(201).json(newUserVote.get({ plain: true }));  
  } catch (error) {
    console.error('Error while creating the user vote:', error);
    if (error instanceof Error) {
      return res.status(500).json({ message: "Error while creating the user vote.", error: error.message });
    } else {
      return res.status(500).json({ message: "Error while creating the user vote." });
    }
  }
}
const getAllVotesByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const votes = await UserVote.findAll({
      where: {
        userId: userId
      }
    });
    return res.status(200).json(votes);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Error occurred while trying to retrieve votes."});
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

const getWinnerByVoteId = async (req: Request, res: Response) => {
  try {
    const voteId = req.params.voteId;
    const userVotes = await UserVote.findAll({
      where: { voteId }
    });

    if (userVotes.length === 0) {
      return res.status(404).json({ message: "No votes found for this vote ID." });
    }

    const voteCount: Record<string, number> = {};
    userVotes.forEach(vote => {
      voteCount[vote.optionId] = (voteCount[vote.optionId] || 0) + 1;
    });

    const winnerOptionId = Object.keys(voteCount).reduce((a, b) => voteCount[a] > voteCount[b] ? a : b);

    const winnerOption = await Option.findOne({
      where: { id: winnerOptionId }
    });

    if (!winnerOption) {
      return res.status(404).json({ message: "Winner option details not found." });
    }

    return res.status(200).json({ winnerOptionLabel: winnerOption.label });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error occurred while trying to calculate the winner." });
  }
}

const getUserVoteById = async (req: Request, res: Response) => {
  try {
    const userVoteId = req.params.id;
    const userVote = await UserVote.findByPk(userVoteId);
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
  const hasVoted = async (req: Request, res: Response) => {
    try {
        const { voteId, userId } = req.params;
        const userVotes = await UserVote.findAll({ where: { userId, voteId } });
        if (userVotes !== null && userVotes.length > 0) {
            res.status(200).json({ hasVoted: true });
        } else {
            res.status(200).json({ hasVoted: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error while checking if the user has voted"});
    }
}

  const updateUserVote = async (req: Request, res: Response) => {
    const { error, value } = validateUserVote(req.body);
    if (error) {
      logger.error(error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }
  
    try {
      const userVoteId = req.params.id;
      const userVote = await UserVote.findByPk(userVoteId);
      if (userVote !== null) {
        const { userId, voteId,optionId } = value;
        await userVote.update({ userId, voteId,optionId });
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
    const userVoteId = req.params.id;
    const userVote = await UserVote.findByPk(userVoteId);
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

const getUserOptionByVoteId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const voteId = req.params.voteId;

    const userVote = await UserVote.findOne({
      where: {
        userId: userId,
        voteId: voteId
      }
    });

    if (userVote !== null) {
      const option = await Option.findOne({
        where: {
          id: userVote.optionId
        }
      });

      if (option !== null) {
        res.status(200).json({ option: option });
      } else {
        res.status(404).json({ message: "Option not found" });
      }
    } else {
      res.status(404).json({ message: "User vote not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error encountered while trying to get the user vote option" });
  }
}

export {getWinnerByVoteId,getUserOptionByVoteId,hasVoted,getAllVotesByUserId,updateUserVote,createUserVote, getAllUserVotes, getUserVoteById, deleteUserVote, getUserVotesByUserId};