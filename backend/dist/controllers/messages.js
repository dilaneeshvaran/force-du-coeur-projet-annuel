"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.getMessageById = exports.getAllMessages = exports.createMessage = exports.isMessageReplied = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const createMessage = (req, res, fileAttachment) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateMessage)(req.body);
    if (error) {
        middlewares_1.logger.error(error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { concernedMsgId, userId, replyAdminId, fullName, email, createdAt, senderMail, receiverMail, subject, message, type, fileAttachment, replied } = value;
        if (!email) {
            return res.status(400).json({ message: "email champ ne doit être vide" });
        }
        const newMessage = yield models_1.Message.create({
            userId,
            replyAdminId,
            fullName,
            email,
            subject,
            message,
            type,
            fileAttachment,
            createdAt,
            senderMail,
            receiverMail,
            replied,
            concernedMsgId
        });
        return res.status(201).json(newMessage);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la création d'un message." });
    }
});
exports.createMessage = createMessage;
const isMessageReplied = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.id;
        const message = yield models_1.Message.findByPk(messageId);
        if (message !== null) {
            message.replied = true;
            yield message.save();
            res.status(200).json(message);
        }
        else {
            res.status(404).json({ message: "Message non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du message" });
    }
});
exports.isMessageReplied = isMessageReplied;
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, replied } = req.query;
        let queryObj = {};
        if (type) {
            queryObj['type'] = type;
        }
        if (replied) {
            queryObj['replied'] = replied === 'true';
        }
        const messages = yield models_1.Message.findAll({
            where: queryObj,
        });
        return res.status(200).json(messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des messages." });
    }
});
exports.getAllMessages = getAllMessages;
const getMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.id;
        const message = yield models_1.Message.findByPk(messageId);
        if (message !== null) {
            res.status(200).json(message);
        }
        else {
            res.status(404).json({ message: "Message non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche du message" });
    }
});
exports.getMessageById = getMessageById;
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.id;
        const { subject, message, type, replied, concernedMsgId } = req.body;
        const existingMessage = yield models_1.Message.findByPk(messageId);
        if (existingMessage !== null) {
            if (subject !== undefined)
                existingMessage.subject = subject;
            if (message !== undefined)
                existingMessage.message = message;
            if (type !== undefined)
                existingMessage.type = type;
            if (replied !== undefined)
                existingMessage.replied = replied;
            if (concernedMsgId !== undefined)
                existingMessage.concernedMsgId = concernedMsgId;
            yield existingMessage.save();
            res.status(200).json(existingMessage);
        }
        else {
            res.status(404).json({ message: "Message non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du message" });
    }
});
exports.updateMessage = updateMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageId = req.params.id;
        const message = yield models_1.Message.findByPk(messageId);
        if (message !== null) {
            // supprimer le message de la BDD
            yield message.destroy();
            res.status(200).json({ message: "Supression du message réussie" });
        }
        else {
            res.status(404).json({ message: "Message non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontré en essayant de supprimer le message" });
    }
});
exports.deleteMessage = deleteMessage;
