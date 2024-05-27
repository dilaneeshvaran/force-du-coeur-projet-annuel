"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * Routes pour gérer les dons.
 */
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
//router.post('/', isAuth, createDonation); 
exports.router.post('/', controllers_1.createDonation);
exports.router.get('/', controllers_1.getAllDonations);
exports.router.get('/:id', controllers_1.getDonationById);
