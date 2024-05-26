import joi from 'joi';

const useOfResourceValidation = joi.object ({
  label: joi.string().required(),
  type: joi.string().required(),
  description: joi.string().required(),
});

const validateUseOfResource = (data: any) => {
  return useOfResourceValidation.validate(data);
}

export { useOfResourceValidation, validateUseOfResource };