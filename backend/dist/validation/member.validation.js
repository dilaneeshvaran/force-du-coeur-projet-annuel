"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMember = exports.memberValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const memberValidation = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    firstName: joi_1.default.string().trim().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(20).required(),
    role: joi_1.default.string().valid('admin', 'member').required(),
    memberSince: joi_1.default.date().required(),
    dateOfBirth: joi_1.default.date().required(),
});
exports.memberValidation = memberValidation;
const validateMember = (data) => {
    return memberValidation.validate(data);
};
exports.validateMember = validateMember;
