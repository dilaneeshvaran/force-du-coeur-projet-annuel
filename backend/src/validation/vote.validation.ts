import joi from 'joi';

const validateOptions = joi.array().items(joi.object ({
  label: joi.string().required(),
  votes: joi.number().integer().min(0).required()
})).max(10).required();

const voteValidation = joi.object ({
  title: joi.string().required(),
  description: joi.string().required(),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  votingType: joi.string().valid('one-round', 'two-round').required(),
  ongoingRound: joi.string().valid('first-round', 'second-round').required(),
  votingMethod: joi.string().valid('majority rule', 'absolute majority').required(),
  status: joi.string().valid('open', 'closed').required(),
  options: validateOptions,
  createdBy: joi.number().required(),
  voterId: joi.number().required()
});

const validateVote = (data: any) => {
  return voteValidation.validate(data);
}

export { voteValidation, validateVote };