"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvent = exports.eventValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const eventValidation = joi_1.default.object({
    title: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    date: joi_1.default.date().optional(),
    location: joi_1.default.string().optional(),
    availableSpots: joi_1.default.number().optional(),
    membersOnly: joi_1.default.boolean().optional(),
    participations: joi_1.default.number().optional()
});
exports.eventValidation = eventValidation;
const validateEvent = (data) => {
    return eventValidation.validate(data);
};
exports.validateEvent = validateEvent;
