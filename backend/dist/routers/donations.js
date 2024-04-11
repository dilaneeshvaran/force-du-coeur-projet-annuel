"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * Routes pour gérer les donations.
 */
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.post('/', middlewares_1.isAuth, controllers_1.createDonation);
exports.router.get('/', controllers_1.getAllDonations);
exports.router.get('/:id', controllers_1.getDonationById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateDonation);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteDonation);
