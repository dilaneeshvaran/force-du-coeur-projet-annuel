"use strict";
/**
 * Routes pour gérer les votes effectués par les membres.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK votes'} );
//})
//router.post('/', isAuth, createVote); 
exports.router.post('/', controllers_1.createVote);
exports.router.get('/', controllers_1.getAllVotes);
exports.router.get('/:id', controllers_1.getVoteById);
exports.router.put('/:id', controllers_1.updateVote);
//router.put('/:id', isAuth, updateVote);
exports.router.delete('/:id', controllers_1.deleteVote);
