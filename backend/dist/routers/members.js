"use strict";
/**
 * Routes pour répertorier les membres de l'association.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
/*router.get('/', (req: Request, res: Response) => {
  res.send( { message: 'OK members'} );
})*/
// pas encore de système d'authentification
//router.post('/', isAuth, createMember);
exports.router.post('/', controllers_1.createMember);
exports.router.get('/', controllers_1.getAllMembers);
exports.router.get('/:id', controllers_1.getMemberById);
//router.put('/:id', isAuth, updateMember);
exports.router.put('/:memberId', controllers_1.updateMember);
//router.delete('/:id', isAuth, deleteMember);
exports.router.delete('/:id', controllers_1.deleteMember);
