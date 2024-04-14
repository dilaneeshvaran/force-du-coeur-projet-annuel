"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = exports.taskValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const taskValidation = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().optional(),
    status: joi_1.default.string().valid('pending', 'in progress', 'completed').required(),
    responsibleId: joi_1.default.number().required(),
});
exports.taskValidation = taskValidation;
const validateTask = (data) => {
    return taskValidation.validate(data);
};
exports.validateTask = validateTask;
