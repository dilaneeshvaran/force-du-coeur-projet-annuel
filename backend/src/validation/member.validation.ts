import joi from 'joi';

const memberValidation = joi.object ({
  name: joi.string().trim().required(),
  firstName: joi.string().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(20).required(),
  role: joi.string().valid('admin', 'member').required(),
  memberSince: joi.date().required(),
  dateOfBirth: joi.date().required(),
});

const validateMember = (data: any) => {
  return memberValidation.validate(data);
}

export { memberValidation, validateMember };