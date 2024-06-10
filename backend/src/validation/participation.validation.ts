import joi from 'joi';

const participationValidation = joi.object ({
  userId: joi.number().required(),
  eventId: joi.number().required(),
});

const validateParticipation = (data: any) => {
  return participationValidation.validate(data);
}

export { participationValidation, validateParticipation };