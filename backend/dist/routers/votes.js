"use strict";
/**
 * Routes pour gérer les votes effectués par les membres.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK votes' });
});
exports.router.post('/', middlewares_1.isAuth, controllers_1.createVote);
exports.router.get('/', controllers_1.getAllVotes);
exports.router.get('/:id', controllers_1.getVoteById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateVote);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteVote);
