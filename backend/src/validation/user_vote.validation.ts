import joi from 'joi';

const userVoteValidation = joi.object ({
  userId: joi.number().optional(),
  voteId: joi.number().optional(),
  optionId:joi.number().optional()
});

const validateUserVote = (data: any) => {
  return userVoteValidation.validate(data);
}

export { userVoteValidation, validateUserVote };