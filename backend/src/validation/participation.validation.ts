import joi from 'joi';

const participationValidation = joi.object ({
  userId: joi.string().required(),
  eventId: joi.string().required(),
});

const validateParticipation = (data: any) => {
  return participationValidation.validate(data);
}

export { participationValidation, validateParticipation };