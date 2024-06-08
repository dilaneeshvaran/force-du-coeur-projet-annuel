import joi from 'joi';

const messageValidation = joi.object ({
  id: joi.number().required(),
  subject: joi.string().required(),
  message: joi.string().optional(),
  type: joi.string().valid('sent', 'received').required(),
  fileAttachment: joi.string().uri().optional(), 
});

const validateMessage = (data: any) => {
  return messageValidation.validate(data);
}

export { messageValidation, validateMessage };