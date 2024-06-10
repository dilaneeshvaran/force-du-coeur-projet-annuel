import joi from 'joi';

const validateOptions = joi.array().items(joi.object ({
  label: joi.string().required(),
  voteId: joi.number().integer().min(0).required(),
  votes: joi.number().integer().min(0).optional()
}))

const voteValidation = joi.object ({
  title: joi.string().required(),
  description: joi.string().required(),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  votingType: joi.string().valid('one-round', 'two-round').required(),
  ongoingRound: joi.string().valid('first-round', 'second-round').required(),
  votingMethod: joi.string().valid('majority rule', 'absolute majority').required(),
  status: joi.string().valid('open', 'closed').optional(),
  createdBy: joi.number().optional(),
  voterId: joi.number().optional()
});

const validateVote = (data: any) => {
  return voteValidation.validate(data);
}

export {validateOptions, voteValidation, validateVote };