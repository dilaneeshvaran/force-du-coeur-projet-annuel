"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserAuth = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const userValidation = joi_1.default.object({
    username: joi_1.default.string().trim().optional(),
    password: joi_1.default.string().min(8).max(20).optional(),
    email: joi_1.default.string().email().optional(),
    firstname: joi_1.default.string().trim().optional(),
    lastname: joi_1.default.string().trim().optional(),
    birthOfDate: joi_1.default.date().optional(),
    role: joi_1.default.string().valid('user', 'admin').optional(),
});
const userAuthValidation = joi_1.default.object({
    password: joi_1.default.string().min(8).max(20).required(),
    email: joi_1.default.string().email().required()
});
const validateUser = (data) => {
    return userValidation.validate(data);
};
exports.validateUser = validateUser;
const validateUserAuth = (data) => {
    return userAuthValidation.validate(data);
};
exports.validateUserAuth = validateUserAuth;
