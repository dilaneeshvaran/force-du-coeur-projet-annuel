import joi from 'joi';

const donationValidation = joi.object ({
  amount: joi.number().required(),
  donationDate: joi.date().required(),
  donorId: joi.number().required(),
  paymentMethod: joi.string().required(),
  status: joi.string().valid('pending', 'confirmed', 'cancelled').required()
});

const validateDonation = (data: any) => {
  return donationValidation.validate(data);
}

export { donationValidation, validateDonation };