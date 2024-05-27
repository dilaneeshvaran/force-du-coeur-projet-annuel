"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUseOfResource = exports.useOfResourceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const useOfResourceValidation = joi_1.default.object({
    label: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
exports.useOfResourceValidation = useOfResourceValidation;
const validateUseOfResource = (data) => {
    return useOfResourceValidation.validate(data);
};
exports.validateUseOfResource = validateUseOfResource;
