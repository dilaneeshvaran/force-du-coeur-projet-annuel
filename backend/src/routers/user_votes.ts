import express from 'express';
import {getWinnerByVoteId, getUserOptionByVoteId,createUserVote, updateUserVote, getAllUserVotes, getUserVoteById, deleteUserVote, getUserVotesByUserId } from '../controllers/user_votes';

const router = express.Router();

router.post('/', createUserVote);
router.put('/:id', updateUserVote);
router.get('/', getAllUserVotes);
router.get('/winner/:voteId', getWinnerByVoteId);
router.get('/:id', getUserVoteById);
router.delete('/:id', deleteUserVote);
router.get('/user/:id', getUserVotesByUserId);
router.get('/:userId/vote/:voteId', getUserOptionByVoteId);

export default router;