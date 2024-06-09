import joi from 'joi';

const documentValidation = joi.object ({
  documentId: joi.number().required(),
  title: joi.string().optional(),
  description: joi.string().optional(),
  file: joi.string().optional(),
  isArchieved: joi.boolean().optional(),
  senderOd: joi.number().optional(),
  receiverId: joi.number().optional(),
});

const validateDocument = (data: any) => {
  return documentValidation.validate(data);
}

export { documentValidation, validateDocument };