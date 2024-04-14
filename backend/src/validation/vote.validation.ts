import joi from 'joi';

const voteValidation = joi.object ({
  title: joi.string().required(),
  description: joi.string().required(),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  votingType: joi.string().valid('one-round', 'two-round').required(),
  votingMethod: joi.string().valid('majority rule', 'absolute majority').required(),
  status: joi.string().valid('open', 'closed').required(),
});

const validateVote = (data: any) => {
  return voteValidation.validate(data);
}

export { voteValidation, validateVote };