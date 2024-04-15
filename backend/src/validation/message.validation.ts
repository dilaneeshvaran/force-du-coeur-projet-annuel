import joi from 'joi';

const messageValidation = joi.object ({
  content: joi.string().required(),
  creationDate: joi.date().required(),
  authorId: joi.number().required(),
  recipientId: joi.number().required(),
});

const validateMessage = (data: any) => {
  return messageValidation.validate(data);
}

export { messageValidation, validateMessage };