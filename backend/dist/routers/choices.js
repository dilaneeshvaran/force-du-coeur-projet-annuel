"use strict";
/**
 * Routes pour la gestion des choix associés aux votes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK choices' } );
//})
//router.post('/', isAuth, createChoice); 
exports.router.post('/', controllers_1.createChoice);
exports.router.get('/', controllers_1.getAllChoices);
exports.router.get('/:id', controllers_1.getChoiceById);
exports.router.put('/:id', controllers_1.updateChoice);
//router.put('/:id', isAuth, updateChoice);
exports.router.delete('/:id', controllers_1.deleteChoice);
//router.delete('/:id', isAuth, deleteChoice);
