import joi from 'joi';

const taskValidation = joi.object ({
  title: joi.string().optional(),
  description: joi.string().optional(),
  deadline: joi.date().optional(),
  assigned_date: joi.date().optional(),
  status: joi.string().valid('ongoing', 'completed', 'failed').optional(),
  assignedTo: joi.number().optional(),
  createdBy: joi.number().optional(),
  completedDate: joi.date().optional(),
  failedDate: joi.date().optional()
});

const validateTask = (data: any) => {
  return taskValidation.validate(data);
}

export { taskValidation, validateTask };