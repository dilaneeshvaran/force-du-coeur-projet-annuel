"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * Routes administratives pour Force du Coeur.
 */
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK Admin' });
});
