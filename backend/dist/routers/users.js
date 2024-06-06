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
//router.get('/', authenticateToken, getAllUsers);
exports.router.get('/', controllers_1.getAllUsers);
exports.router.get('/:id', controllers_1.getUserById);
//router.get('/admin', authenticateToken, authorizeAdmin, adminAccess);
//router.post('/logout', authenticateToken, logout);