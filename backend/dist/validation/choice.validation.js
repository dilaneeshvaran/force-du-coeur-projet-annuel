"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChoice = exports.choiceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const choiceValidation = joi_1.default.object({
    label: joi_1.default.string().required(),
    voteId: joi_1.default.number().integer().min(0).required(),
    votes: joi_1.default.number().integer().min(0).optional()
});
exports.choiceValidation = choiceValidation;
const validateChoice = (data) => {
    return choiceValidation.validate(data);
};
exports.validateChoice = validateChoice;
