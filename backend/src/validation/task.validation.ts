import joi from 'joi';

const taskValidation = joi.object ({
  title: joi.string().required(),
  description: joi.string().required(),
  startDate: joi.date().required(),
  endDate: joi.date().optional(),
  status: joi.string().valid('pending', 'in progress', 'completed').required(),
  responsibleId: joi.number().required(),
});

const validateTask = (data: any) => {
  return taskValidation.validate(data);
}

export { taskValidation, validateTask };