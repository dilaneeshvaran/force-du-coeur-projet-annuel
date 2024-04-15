import joi from 'joi';

const documentValidation = joi.object ({
  documentId: joi.number().required(),
  title: joi.string().required(),
  description: joi.string().optional(),
  type: joi.string().required(),
  creationDate: joi.date().required(),
  authorId: joi.number().required()
});

const validateDocument = (data: any) => {
  return documentValidation.validate(data);
}

export { documentValidation, validateDocument };