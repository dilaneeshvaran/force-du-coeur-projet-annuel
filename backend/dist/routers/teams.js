"use strict";
/**
 * Routes pour les gérer les équipes composées de plusieurs membres.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
//router.get('/', (req: Request, res: Response) => {
//res.send( { message: 'OK'} );
//})
//router.get('/:id', (req: Request, res: Response) => {
//res.send( { message: 'OK'} );
//}) --> récupérer une équipe précise
//router.post('/', isAuth, createTeam);
exports.router.post('/', controllers_1.createTeam);
exports.router.get('/', controllers_1.getAllTeams);
exports.router.get('/:id', controllers_1.getTeamById);
//router.put('/:id', isAuth, updateTeam);
exports.router.put('/:id', controllers_1.updateTeam);
//router.delete('/:id', isAuth, deleteTeam);
exports.router.delete('/:id', controllers_1.deleteTeam);
