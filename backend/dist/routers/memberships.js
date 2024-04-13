"use strict";
/**
 * Routes pour la gestion les espaces membres.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK memberships' });
});
exports.router.post('/', middlewares_1.isAuth, controllers_1.createMembership);
exports.router.get('/', controllers_1.getAllMemberships);
exports.router.get('/:id', controllers_1.getMembershipById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateMembership);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteMembership);
