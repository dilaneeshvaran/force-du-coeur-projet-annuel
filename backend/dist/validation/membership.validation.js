"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMembership = exports.membershipValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const membershipValidation = joi_1.default.object({
    amount: joi_1.default.number().required(),
    paymentDate: joi_1.default.date().required(),
    memberId: joi_1.default.number().required(),
    status: joi_1.default.string().valid('pending', 'paid').required()
});
exports.membershipValidation = membershipValidation;
const validateMembership = (data) => {
    return membershipValidation.validate(data);
};
exports.validateMembership = validateMembership;
