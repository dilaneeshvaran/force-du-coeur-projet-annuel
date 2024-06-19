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
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = exports.getNonMembersOnlyEvents = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateEvent)(req.body);
    if (error) {
        res.status(400).json({ message: middlewares_1.logger.error(error.details[0].message) });
    }
    try {
        const { title, description, date, location, availableSpots, membersOnly, participations } = value;
        if (!title) {
            res.status(400).json({ message: "title peux pas etre vide" });
        }
        const newEvent = yield models_1.Event.create({
            title,
            description,
            date,
            location,
            availableSpots,
            membersOnly,
            participations
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'évènement." });
    }
});
exports.createEvent = createEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield models_1.Event.findAll();
        return res.status(200).json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des évènements." });
    }
});
exports.getAllEvents = getAllEvents;
const getNonMembersOnlyEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield models_1.Event.findAll({ where: { membersOnly: false } });
        return res.status(200).json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des évènements non réservés aux membres." });
    }
});
exports.getNonMembersOnlyEvents = getNonMembersOnlyEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const event = yield models_1.Event.findByPk(eventId);
        if (event !== null) {
            res.status(200).json(event);
        }
        else {
            res.status(404).json({ message: "Evènement non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche de l'évènement" });
    }
});
exports.getEventById = getEventById;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const { title, date, description, location, availableSpots, membersOnly, participations } = req.body;
        const event = yield models_1.Event.findByPk(eventId);
        if (event !== null) {
            if (title !== undefined)
                event.title = title;
            if (date !== undefined)
                event.date = date;
            if (description !== undefined)
                event.description = description;
            if (location !== undefined)
                event.location = location;
            if (availableSpots !== undefined)
                event.availableSpots = availableSpots;
            if (membersOnly !== undefined)
                event.membersOnly = membersOnly;
            if (participations !== undefined)
                event.participations = participations;
            yield event.save();
            res.status(200).json(event);
        }
        else {
            res.status(404).json({ message: "Event not found" });
        }
    }
    catch (error) {
        middlewares_1.logger.error('Error creating vote:', error);
        return res.status(500).json({ message: "Erreur lors de la mise a jour d'un event", error: error.message });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const event = yield models_1.Event.findByPk(eventId);
        if (event !== null) {
            // supprimer l'évènement de la BDD
            yield event.destroy();
            res.status(200).json({ message: "Supression de l'évènement réussi" });
        }
        else {
            res.status(404).json({ message: "Evènement non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontré en essayant de supprimer l'évènement" });
    }
});
exports.deleteEvent = deleteEvent;
