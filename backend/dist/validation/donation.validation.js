"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDonation = exports.donationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const donationValidation = joi_1.default.object({
    amount: joi_1.default.number().required(),
    donationDate: joi_1.default.date().required(),
    donorId: joi_1.default.number().required(),
    paymentMethod: joi_1.default.string().required(),
    status: joi_1.default.string().valid('pending', 'confirmed', 'cancelled').required()
});
exports.donationValidation = donationValidation;
const validateDonation = (data) => {
    return donationValidation.validate(data);
};
exports.validateDonation = validateDonation;
