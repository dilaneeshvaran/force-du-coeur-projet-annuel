"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winston = void 0;
const winston_1 = require("./winston");
/**
 * Middleware pour enregistrer les informations de requête dans la console.
 *
 */
function winston(req, res, next) {
    winston_1.logger.info(`IP : ${req.ip}`);
    next();
}
exports.winston = winston;
