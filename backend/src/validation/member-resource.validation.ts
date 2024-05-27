import joi from 'joi';

const memberResourceValidation = joi.object ({
  memberId: joi.number().required(),
  resourceId: joi.number().required()
});

const validateMemberResource = (data: any) => {
  return memberResourceValidation.validate(data);
}

export { memberResourceValidation, validateMemberResource };