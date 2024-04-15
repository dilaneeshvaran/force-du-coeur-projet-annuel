"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * Routes pour la gestion des ressources.
 */
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK resources' });
});
exports.router.post('/', middlewares_1.isAuth, controllers_1.createResource);
exports.router.get('/', controllers_1.getAllResources);
exports.router.get('/:id', controllers_1.getResourceById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateResource);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteResource);
