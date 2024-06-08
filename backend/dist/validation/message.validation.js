"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = exports.messageValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const messageValidation = joi_1.default.object({
    id: joi_1.default.number().required(),
    subject: joi_1.default.string().required(),
    message: joi_1.default.string().optional(),
    type: joi_1.default.string().valid('sent', 'received').required(),
    fileAttachment: joi_1.default.string().uri().optional(),
});
exports.messageValidation = messageValidation;
const validateMessage = (data) => {
    return messageValidation.validate(data);
};
exports.validateMessage = validateMessage;
