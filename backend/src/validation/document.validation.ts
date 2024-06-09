import joi from 'joi';

const documentValidation = joi.object ({
  documentId: joi.number().required(),
  title: joi.string().required(),
  description: joi.string().optional(),
  file: joi.string().optional(),
  isArchieved: joi.boolean().optional(),
  senderOd: joi.number().required(),
  receiverId: joi.number().required(),
});

const validateDocument = (data: any) => {
  return documentValidation.validate(data);
}

export { documentValidation, validateDocument };