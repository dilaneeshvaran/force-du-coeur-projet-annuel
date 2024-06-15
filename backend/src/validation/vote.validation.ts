import joi from 'joi';

const validateOptions = joi.array().items(joi.object ({
  label: joi.string().optional(),
  voteId: joi.number().integer().min(0).optional(),
  votes: joi.number().integer().min(0).optional()
}))

const voteValidation = joi.object ({
  title: joi.string().optional(),
  description: joi.string().optional(),
  startDate: joi.date().optional(),
  endDate: joi.date().optional(),
  votingType: joi.string().valid('one-round', 'two-round').optional,
  ongoingRound: joi.string().valid('first-round', 'second-round').optional(),
  votingMethod: joi.string().valid('majority rule', 'absolute majority').optional(),
  status: joi.string().valid('open', 'closed').optional(),
  createdBy: joi.number().optional(),
  voterId: joi.number().optional()
});

const validateVote = (data: any) => {
  return voteValidation.validate(data);
}

export {validateOptions, voteValidation, validateVote };