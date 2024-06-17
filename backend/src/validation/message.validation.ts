import joi from 'joi';

const messageValidation = joi.object ({
  id: joi.number().optional(),
  subject: joi.string().optional(),
  message: joi.string().optional(),
  type: joi.string().valid('sent', 'received').optional(),
  fileAttachment: joi.string().uri().optional(), 
});

const validateMessage = (data: any) => {
  return messageValidation.validate(data);
}

export { messageValidation, validateMessage };