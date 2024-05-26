"use strict";
/**
 * Routes pour la gestion des documents.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK documents' } );
//})
//router.post('/', isAuth, createDocument);
exports.router.post('/', controllers_1.createDocument);
exports.router.get('/', controllers_1.getAllDocuments);
exports.router.get('/:id', controllers_1.getDocumentById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateDocument);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteDocument);
