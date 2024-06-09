import joi from 'joi';

const voteChoiceValidation = joi.object ({
  voteId: joi.number().required(),
});

const validateVoteChoice = (data: any) => {
  return voteChoiceValidation.validate(data);
}

export { voteChoiceValidation, validateVoteChoice };