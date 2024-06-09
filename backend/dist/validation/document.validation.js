"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDocument = exports.documentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const documentValidation = joi_1.default.object({
    documentId: joi_1.default.number().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    file: joi_1.default.string().optional(),
    isArchieved: joi_1.default.boolean().optional(),
    senderOd: joi_1.default.number().required(),
    receiverId: joi_1.default.number().required(),
});
exports.documentValidation = documentValidation;
const validateDocument = (data) => {
    return documentValidation.validate(data);
};
exports.validateDocument = validateDocument;
