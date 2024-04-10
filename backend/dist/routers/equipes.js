"use strict";
/**
 * Routes pour les évènements de Force du Coeur.
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
exports.router.post('/', middlewares_1.isAuth, controllers_1.creerEquipe); // besoin d'être authentifié pour faire ça
exports.router.get('/', controllers_1.recupererEquipes);
exports.router.get('/:id', controllers_1.recupererEquipeParId);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.mettreAJourEquipe);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.supprimerEquipe);
