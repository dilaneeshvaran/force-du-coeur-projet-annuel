import joi from 'joi';

const documentValidation = joi.object ({
  documentId: joi.number().optional(),
  title: joi.string().optional(),
  description: joi.string().optional(),
  file: joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    buffer: joi.binary().required(),
    size: joi.number().required(),
  }).required(),
  isArchieved: joi.boolean().optional(),
  senderId: joi.number().optional(),
  receiverId: joi.number().optional(),
});

const validateDocument = (data: any) => {
  return documentValidation.validate(data);
}

export { documentValidation, validateDocument };