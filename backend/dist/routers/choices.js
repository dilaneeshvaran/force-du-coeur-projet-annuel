"use strict";
/**
 * Routes pour la gestion des choix associés aux votes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK choices' });
});
exports.router.post('/', middlewares_1.isAuth, controllers_1.createChoice);
exports.router.get('/', controllers_1.getAllChoices);
exports.router.get('/:id', controllers_1.getChoiceById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateChoice);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteChoice);
