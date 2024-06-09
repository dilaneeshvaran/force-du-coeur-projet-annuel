"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDocument = exports.documentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const documentValidation = joi_1.default.object({
    documentId: joi_1.default.number().optional(),
    title: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    file: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().required(),
        buffer: joi_1.default.binary().required(),
        size: joi_1.default.number().required(),
    }).required(),
    isArchieved: joi_1.default.boolean().optional(),
    senderId: joi_1.default.number().optional(),
    receiverId: joi_1.default.number().optional(),
});
exports.documentValidation = documentValidation;
const validateDocument = (data) => {
    return documentValidation.validate(data);
};
exports.validateDocument = validateDocument;
