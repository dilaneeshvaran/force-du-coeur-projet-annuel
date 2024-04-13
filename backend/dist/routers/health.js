"use strict";
/**
 * Routes associées aux actualités pour Force du Coeur.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.use(middlewares_1.timeZoneFormatter);
// récupérer l'heure de soumission de la requête
exports.router.get('/', (req, res) => {
    //throw new Error('App Error');
    const formattedDate = res.locals.formatTime(new Date());
    res.send({ message: 'OK', formattedDate });
});
