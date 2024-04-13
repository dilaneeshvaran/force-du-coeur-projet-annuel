"use strict";
/**
 * Routes pour gérer les évènements.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK events' });
});
exports.router.post('/', middlewares_1.isAuth, controllers_1.createEvent);
exports.router.get('/', controllers_1.getAllEvents);
exports.router.get('/:id', controllers_1.getEventById);
exports.router.put('/:id', middlewares_1.isAuth, controllers_1.updateEvent);
exports.router.delete('/:id', middlewares_1.isAuth, controllers_1.deleteEvent);
