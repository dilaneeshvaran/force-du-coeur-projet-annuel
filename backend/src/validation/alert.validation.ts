import joi from 'joi';

const alertValidation = joi.object({
  id: joi.number().optional(),
  label: joi.string().optional(),
  description: joi.string().optional(),
  date: joi.date().optional(),
  isArchived: joi.boolean().optional(),
});

const validateAlert = (data: any) => {
  return alertValidation.validate(data);
}

export { alertValidation, validateAlert };