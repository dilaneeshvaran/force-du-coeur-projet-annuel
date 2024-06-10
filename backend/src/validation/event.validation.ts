import joi from 'joi';

const eventValidation = joi.object ({
  title: joi.string().optional(),
  description: joi.string().optional(),
  date: joi.date().optional(),
  location: joi.string().optional(),
  availableSpots: joi.number().optional(),
  membersOnly: joi.boolean().optional()
});

const validateEvent = (data: any) => {
  return eventValidation.validate(data);
}

export { eventValidation, validateEvent };