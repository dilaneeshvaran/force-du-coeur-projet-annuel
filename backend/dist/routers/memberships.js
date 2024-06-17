"use strict";
/**
 * Routes pour la gestion les espaces membres.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
//router.get('/', (req: Request, res: Response) => {
//  res.send( { message: 'OK memberships' } );
//})
//router.post('/', isAuth, createMembership); 
exports.router.post('/', controllers_1.createMembership);
exports.router.get('/', controllers_1.getAllMemberships);
exports.router.get('/:id', controllers_1.getMembershipById);
//router.put('/:id', isAuth, updateMembership);
exports.router.put('/:id', controllers_1.updateMembership);
//router.delete('/:id', isAuth, deleteMembership);
exports.router.delete('/:id', controllers_1.deleteMembership);
exports.router.get('/user/:userId', controllers_1.getMembershipByUserId);
