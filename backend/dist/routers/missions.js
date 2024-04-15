"use strict";
/**
 * Routes pour gérer les missions de Force de Coeur.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK missions' });
});
exports.router.post('/', middlewares_1.isAuth, controllers_1.createMission);
exports.router.get('/', controllers_1.getAllMissions);
exports.router.get('/:id', controllers_1.getMissionById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateMission);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteMission);
