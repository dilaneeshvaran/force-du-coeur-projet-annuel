"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVote = exports.voteValidation = exports.validateOptions = void 0;
const joi_1 = __importDefault(require("joi"));
const validateOptions = joi_1.default.array().items(joi_1.default.object({
    label: joi_1.default.string().optional(),
    voteId: joi_1.default.number().integer().min(0).optional(),
    votes: joi_1.default.number().integer().min(0).optional()
}));
exports.validateOptions = validateOptions;
const voteValidation = joi_1.default.object({
    title: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    startDate: joi_1.default.date().optional(),
    endDate: joi_1.default.date().optional(),
    votingType: joi_1.default.string().valid('one-round', 'two-round').optional,
    ongoingRound: joi_1.default.string().valid('first-round', 'second-round').optional(),
    votingMethod: joi_1.default.string().valid('majority rule', 'absolute majority').optional(),
    status: joi_1.default.string().valid('open', 'closed').optional(),
    createdBy: joi_1.default.number().optional(),
    voterId: joi_1.default.number().optional()
});
exports.voteValidation = voteValidation;
const validateVote = (data) => {
    return voteValidation.validate(data);
};
exports.validateVote = validateVote;
