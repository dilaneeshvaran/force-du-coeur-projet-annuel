import joi from 'joi';

const userValidation = joi.object ({
  username: joi.string().trim().required(),
  password: joi.string().min(8).max(20).required(),
  email: joi.string().email().required(),
  firstname: joi.string().trim().required(),
  lastname: joi.string().trim().required(),
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