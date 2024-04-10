"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeFormatter = void 0;
function timeFormatter(req, res, next) {
    req.timestamp = new Date().getTime();
    next();
}
exports.timeFormatter = timeFormatter;
