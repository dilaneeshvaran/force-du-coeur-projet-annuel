import joi from 'joi';

const resourceValidation = joi.object ({
  label: joi.string().required(),
  type: joi.string().required(),
  description: joi.string().required(),
});

const validateResource = (data: any) => {
  return resourceValidation.validate(data);
}

export { resourceValidation, validateResource };