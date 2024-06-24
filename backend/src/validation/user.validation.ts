import joi from 'joi';

const userValidation = joi.object ({
  username: joi.string().trim().optional(),
  password: joi.string().min(8).max(20).optional(),
  email: joi.string().email().optional(),
  firstname: joi.string().trim().optional(),
  lastname: joi.string().trim().optional(),
  dateOfBirth: joi.date().optional(),
  role: joi.string().valid('user', 'admin').optional(),
  phoneNumber: joi.string().optional(),
  country: joi.string().trim().optional(),
  city: joi.string().trim().optional(),
  address: joi.string().trim().optional(),
  isBan: joi.boolean().optional()
});

const userAuthValidation = joi.object ({
  password: joi.string().min(8).max(20).required(),
  email: joi.string().email().required()
});

const validateUser = (data: any) => {
  return userValidation.validate(data);
}

const validateUserAuth = (data: any) => {
  return userAuthValidation.validate(data);
}

export { validateUser, validateUserAuth };