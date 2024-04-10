"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimestamp = void 0;
function getTimestamp(req, res, next) {
    req.timestamp = new Date().getTime();
    next();
}
exports.getTimestamp = getTimestamp;
