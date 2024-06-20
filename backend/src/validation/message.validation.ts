import joi from 'joi';

const messageValidation = joi.object ({
  id: joi.number().optional(),
  subject: joi.string().optional(),
  message: joi.string().optional(),
  type: joi.string().valid('sent', 'received').optional(),
  fileAttachment: joi.string().uri().optional(),
  createdAt: joi.date().optional(),
  senderMail: joi.number().optional(),
  receiverMail: joi.number().optional(),
  userId: joi.number().optional(),
  fullName: joi.string().optional(),
  email: joi.string().email().optional(),
  replied: joi.boolean().optional(),
  replyAdminId: joi.number().optional(),
});

const validateMessage = (data: any) => {
  return messageValidation.validate(data);
}

export { messageValidation, validateMessage };