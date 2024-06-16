import joi from 'joi';

const donationValidation = joi.object ({
  amount: joi.number().optional(),
  donationDate: joi.date().optional(),
fullname: joi.string().optional(),
  paymentMethod: joi.string().optional(),
  donationFrequency: joi.string().valid('monthly', 'yearly', 'punctual').optional(),
  donatorId: joi.number().optional(),
  email: joi.string().email().optional(),});

const validateDonation = (data: any) => {
  return donationValidation.validate(data);
}

export { donationValidation, validateDonation };