"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMembership = exports.membershipValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const membershipValidation = joi_1.default.object({
    amount: joi_1.default.number().optional(),
    paymentDate: joi_1.default.date().optional(),
    userId: joi_1.default.number().optional(),
    status: joi_1.default.string().valid('active', 'inactive').optional()
});
exports.membershipValidation = membershipValidation;
const validateMembership = (data) => {
    return membershipValidation.validate(data);
};
exports.validateMembership = validateMembership;
