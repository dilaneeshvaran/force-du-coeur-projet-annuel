import joi from 'joi';

const answerValidation = joi.object ({
  id: joi.number().optional(),
  response: joi.string().optional(),
  questionId: joi.number().optional(),
  userId: joi.number().optional()
});

const validateAnswer = (data: any) => {
  return answerValidation.validate(data);
}

export { answerValidation, validateAnswer };