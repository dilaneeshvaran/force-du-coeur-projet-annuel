"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDonation = exports.donationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const donationValidation = joi_1.default.object({
    amount: joi_1.default.number().optional(),
    donationDate: joi_1.default.date().optional(),
    fullname: joi_1.default.string().optional(),
    paymentMethod: joi_1.default.string().optional(),
    donationFrequency: joi_1.default.string().valid('monthly', 'yearly', 'punctual').optional(),
    donatorId: joi_1.default.number().allow(null).optional(),
    email: joi_1.default.string().email().optional(),
});
exports.donationValidation = donationValidation;
const validateDonation = (data) => {
    return donationValidation.validate(data);
};
exports.validateDonation = validateDonation;
