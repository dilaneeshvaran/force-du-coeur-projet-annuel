"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVoteChoice = exports.voteChoiceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const voteChoiceValidation = joi_1.default.object({
    voteId: joi_1.default.number().required(),
    choiceId: joi_1.default.number().required(),
});
exports.voteChoiceValidation = voteChoiceValidation;
const validateVoteChoice = (data) => {
    return voteChoiceValidation.validate(data);
};
exports.validateVoteChoice = validateVoteChoice;
