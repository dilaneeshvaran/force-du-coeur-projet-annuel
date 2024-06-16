import joi from 'joi';

const membershipValidation = joi.object ({
  amount: joi.number().optional(),
  paymentDate: joi.date().optional(),
  userId: joi.number().optional(),
  status: joi.string().valid('active', 'inactive').optional()
});

const validateMembership = (data: any) => {
  return membershipValidation.validate(data);
}

export { membershipValidation, validateMembership };