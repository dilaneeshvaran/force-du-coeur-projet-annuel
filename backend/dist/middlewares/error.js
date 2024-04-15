"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const winston_1 = require("./winston");
function errorHandler(err, req, res, next) {
    winston_1.logger.error(`Oups, une erreur : ${err.message}`, { error: err });
    res.status(500).json({ error: "Une erreur est survenue. Retentez l'expérience plus tard. " });
    next();
}
exports.errorHandler = errorHandler;
