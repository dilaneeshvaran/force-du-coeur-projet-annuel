"use strict";
/**
 * Routes pour répertorier les membres de l'association.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRevocationList = exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
// révoquer les jetons
exports.tokenRevocationList = [];
exports.router.post('/register', controllers_1.register);
exports.router.post('/login', controllers_1.login);
exports.router.post('/request-reset-password', controllers_1.requestPasswordReset);
exports.router.post('/reset-password/:token', controllers_1.resetPassword);
//router.get('/', authenticateToken, getAllUsers);
exports.router.get('/membersThisMonth', controllers_1.getUsersCreatedThisMonth);
exports.router.get('/', controllers_1.getAllUsers);
exports.router.get('/:id', controllers_1.getUserById);
exports.router.delete('/:id', controllers_1.deleteUser);
exports.router.put('/:id', controllers_1.updateUser);
exports.router.post('/adminlogin', controllers_1.adminlogin);
//router.get('/admin', authenticateToken, authorizeAdmin, adminAccess);
//router.post('/logout', authenticateToken, logout);
