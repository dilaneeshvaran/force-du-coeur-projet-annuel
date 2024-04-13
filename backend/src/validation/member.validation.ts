import joi from 'joi';

const memberValidation = joi.object ({
  name: joi.string().required(),
  firstName: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().valid('admin', 'member').required(),
  memberSince: joi.date().required(),
  dateOfBirth: joi.date().required(),
});

const validateMember = (data: any) => {
  return memberValidation.validate(data);
}

export { memberValidation, validateMember };