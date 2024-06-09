import joi from 'joi';

const optionValidation = joi.object ({
  label: joi.string().required(),
  voteId: joi.number().integer().min(0).required(),
  votes: joi.number().integer().min(0).optional()
});

const validateOption = (data: any) => {
  const { error, value } = optionValidation.validate(data);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  return value;
}

export { optionValidation, validateOption };