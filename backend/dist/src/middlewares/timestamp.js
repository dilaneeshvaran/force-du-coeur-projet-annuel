"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
function timestamp(req, res, next) {
    req.timestamp = new Date().getTime();
    next();
}
exports.timestamp = timestamp;
