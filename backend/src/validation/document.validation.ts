import joi from 'joi';

const documentValidation = joi.object ({
  documentId: joi.number().required(),
  title: joi.string().required(),
  description: joi.string().optional(),
  type: joi.string().required(),
  creationDate: joi.date().required(),
  authorId: joi.number().optional(),
  isArchieved: joi.boolean().required(),
  receiverId: joi.number().required(),
  senderOd: joi.number().required(),
  file: joi.string().optional()
});

const validateDocument = (data: any) => {
  return documentValidation.validate(data);
}

export { documentValidation, validateDocument };