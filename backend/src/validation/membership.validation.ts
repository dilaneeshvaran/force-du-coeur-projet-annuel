import joi from 'joi';

const membershipValidation = joi.object ({
  id: joi.number().optional(),
  amount: joi.number().valid(10, 30, 50, 100).optional(),
  paymentDate: joi.date().optional(),
  userId: joi.number().optional(),
  status: joi.string().valid('active', 'inactive').optional()
});

const validateMembership = (data: any) => {
  return membershipValidation.validate(data);
}

export { membershipValidation, validateMembership };

