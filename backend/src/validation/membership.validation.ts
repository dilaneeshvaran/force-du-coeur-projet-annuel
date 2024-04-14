import joi from 'joi';

const membershipValidation = joi.object ({
  amount: joi.number().required(),
  paymentDate: joi.date().required(),
  memberId: joi.number().required(),
  status: joi.string().valid('pending', 'paid').required()
});

const validateMembership = (data: any) => {
  return membershipValidation.validate(data);
}

export { membershipValidation, validateMembership };