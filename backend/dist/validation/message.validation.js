"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = exports.messageValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const messageValidation = joi_1.default.object({
    id: joi_1.default.number().optional(),
    subject: joi_1.default.string().optional(),
    message: joi_1.default.string().optional(),
    type: joi_1.default.string().valid('sent', 'received').optional(),
    fileAttachment: joi_1.default.string().uri().optional(),
    createdAt: joi_1.default.date().optional(),
    senderMail: joi_1.default.string().optional(),
    receiverMail: joi_1.default.string().optional(),
    userId: joi_1.default.number().optional(),
    fullName: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    replied: joi_1.default.boolean().optional(),
    replyAdminId: joi_1.default.number().optional(),
    concernedMsgId: joi_1.default.number().optional(),
});
exports.messageValidation = messageValidation;
const validateMessage = (data) => {
    return messageValidation.validate(data);
};
exports.validateMessage = validateMessage;
