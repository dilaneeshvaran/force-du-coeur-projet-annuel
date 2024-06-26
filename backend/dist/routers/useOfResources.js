"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * Routes pour la gestion des diverses utilisations des ressources.
 */
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK useOfResources' });
});
exports.router.post('/', controllers_1.createuseOfResource);
exports.router.get('/', controllers_1.getAlluseOfResources);
exports.router.get('/:id', controllers_1.getuseOfResourceById);
exports.router.put('/:id', controllers_1.updateuseOfResource);
exports.router.delete('/:id', controllers_1.deleteuseOfResource);
