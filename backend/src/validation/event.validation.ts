import joi from 'joi';

const eventValidation = joi.object ({
  title: joi.string().required(),
  description: joi.string().required(),
  date: joi.date().required(),
  location: joi.string().required(),
  availableSpots: joi.number().required()
});

const validateEvent = (data: any) => {
  return eventValidation.validate(data);
}

export { eventValidation, validateEvent };