import joi from 'joi';

const choiceValidation = joi.object ({
  label: joi.string().required(),
});

const validateChoice = (data: any) => {
  return choiceValidation.validate(data);
}

export { choiceValidation, validateChoice };