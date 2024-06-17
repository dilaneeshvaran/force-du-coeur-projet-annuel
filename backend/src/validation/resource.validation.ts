import joi from 'joi';

const resourceValidation = joi.object ({
  label: joi.string().optional(),
  type: joi.string().optional(),
  description: joi.string().optional(),
  status: joi.string().valid('used', 'not used', 'wasted').optional(),
  createdDate: joi.date().optional(),
  usedDate: joi.date().optional(),
  wastedDate: joi.date().optional(),
  taskId: joi.number().optional()
});

const validateResource = (data: any) => {
  return resourceValidation.validate(data);
}

export { resourceValidation, validateResource };