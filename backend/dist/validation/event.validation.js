"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvent = exports.eventValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const eventValidation = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    location: joi_1.default.string().required(),
    availableSpots: joi_1.default.number().required()
});
exports.eventValidation = eventValidation;
const validateEvent = (data) => {
    return eventValidation.validate(data);
};
exports.validateEvent = validateEvent;
