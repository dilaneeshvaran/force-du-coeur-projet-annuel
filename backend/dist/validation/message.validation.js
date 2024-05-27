"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = exports.messageValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const messageValidation = joi_1.default.object({
    content: joi_1.default.string().required(),
    creationDate: joi_1.default.date().required(),
    authorId: joi_1.default.number().required(),
    recipientId: joi_1.default.number().required(),
});
exports.messageValidation = messageValidation;
const validateMessage = (data) => {
    return messageValidation.validate(data);
};
exports.validateMessage = validateMessage;
