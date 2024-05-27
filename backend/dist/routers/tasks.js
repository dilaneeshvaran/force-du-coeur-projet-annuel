"use strict";
/**
 * Routes pour gérer les différentes tâches.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
//router.get('/', (req: Request, res: Response) => {
//res.send( { message: 'OK'} );
//})
//router.get('/:id', (req: Request, res: Response) => {
//res.send( { message: 'OK'} );
//}) --> récupérer une équipe précise
//router.post('/', isAuth, createTask);
exports.router.post('/', controllers_1.createTask);
exports.router.get('/', controllers_1.getAllTasks);
exports.router.get('/:id', controllers_1.getTaskById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateTask);
//router.delete('/:id', isAuth, deleteTask);
exports.router.delete('/:id', controllers_1.deleteTask);
