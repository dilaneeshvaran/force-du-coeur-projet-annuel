"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResource = exports.resourceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const resourceValidation = joi_1.default.object({
    label: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
exports.resourceValidation = resourceValidation;
const validateResource = (data) => {
    return resourceValidation.validate(data);
};
exports.validateResource = validateResource;
