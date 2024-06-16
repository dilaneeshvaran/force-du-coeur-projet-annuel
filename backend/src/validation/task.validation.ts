import joi from 'joi';

const taskValidation = joi.object ({
  title: joi.string().optional(),
  description: joi.string().optional(),
  deadline: joi.date().required(),
  assigned_date: joi.date().optional(),
  status: joi.string().valid('ongoing', 'completed', 'failed').optional(),
  assignedTo: joi.number().optional(),
  createdBy: joi.number().optional()
});

const validateTask = (data: any) => {
  return taskValidation.validate(data);
}

export { taskValidation, validateTask };