"use strict";
/**
 * Routes pour gérer les évènements.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
//router.post('/', isAuth, createEvent);
exports.router.post('/', controllers_1.createEvent);
exports.router.get('/', controllers_1.getAllEvents);
exports.router.get('/nonMembersOnly', controllers_1.getNonMembersOnlyEvents);
exports.router.get('/:id', controllers_1.getEventById);
exports.router.put('/:id', controllers_1.updateEvent);
//router.delete('/:id', isAuth, deleteEvent);
exports.router.delete('/:id', controllers_1.deleteEvent);
