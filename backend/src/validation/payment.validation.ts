import joi from 'joi';

const paymentValidation = joi.object ({
  user_id: joi.number().optional(),
  stripe_payment_intent_id: joi.string().optional(),
  stripe_customer_id: joi.string().optional(),
  amount: joi.number().optional(),
  type: joi.string().valid('donation', 'membership').optional(),
  datePaiement: joi.date().optional(),
  typeId: joi.number().optional(),
  email: joi.string().optional()
});

const validatePayment = (data: any) => {
  return paymentValidation.validate(data);
}

export { paymentValidation, validatePayment };