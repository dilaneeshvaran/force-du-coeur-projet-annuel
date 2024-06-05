"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userValidation = joi_1.default.object({
    username: joi_1.default.string().trim().required(),
    password: joi_1.default.string().min(8).max(20).required(),
    email: joi_1.default.string().email().required(),
    firstname: joi_1.default.string().trim().required(),
    lastname: joi_1.default.string().trim().required(),
});
exports.userValidation = userValidation;
const validateUser = (data) => {
    return userValidation.validate(data);
};
exports.validateUser = validateUser;
