"use strict";
/**
 * Routes pour la gestion des messages.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({ message: 'OK messages' });
});
exports.router.post('/', controllers_1.createMessage);
exports.router.get('/', controllers_1.getAllMessages);
exports.router.get('/:id', controllers_1.getMessageById);
exports.router.put('/:id', controllers_1.updateMessage);
exports.router.delete('/:id', controllers_1.deleteMessage);
