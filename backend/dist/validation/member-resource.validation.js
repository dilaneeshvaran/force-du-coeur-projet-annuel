"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMemberResource = exports.memberResourceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const memberResourceValidation = joi_1.default.object({
    memberId: joi_1.default.number().required(),
    resourceId: joi_1.default.number().required()
});
exports.memberResourceValidation = memberResourceValidation;
const validateMemberResource = (data) => {
    return memberResourceValidation.validate(data);
};
exports.validateMemberResource = validateMemberResource;
