"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * Routes pour la gestion des ressources.
 */
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK resources'} );
//})
//router.post('/', isAuth, createResource); 
exports.router.post('/', controllers_1.createResource);
exports.router.get('/', controllers_1.getAllResources);
exports.router.get('/:id', controllers_1.getResourceById);
//router.put('/:id', isAuth, updateResource);
exports.router.put('/:id', controllers_1.updateResource);
//router.delete('/:id', isAuth, deleteResource);
exports.router.delete('/:id', controllers_1.deleteResource);
