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
exports.deleteChoice = exports.updateChoice = exports.getChoiceById = exports.getAllChoices = exports.createChoice = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const createChoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateChoice)(req.body);
    if (error) {
        res.status(400).json({ message: middlewares_1.logger.error(error.details[0].message) });
    }
    try {
        const { label } = value;
        if (!label) {
            res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const newChoice = yield models_1.Choice.create({ label });
        res.status(201).json(newChoice);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ lessage: "Erreur lors de la création du choix." });
    }
});
exports.createChoice = createChoice;
const getAllChoices = (req, res) => {
};
exports.getAllChoices = getAllChoices;
const getChoiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const choices = yield models_1.Choice.findAll();
        return res.status(200).json(choices);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des choix." });
    }
});
exports.getChoiceById = getChoiceById;
const updateChoice = (req, res) => {
    // TODO
};
exports.updateChoice = updateChoice;
const deleteChoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const choiceId = req.params.id;
        const choice = yield models_1.Choice.findByPk(choiceId);
        if (choice !== null) {
            yield choice.destroy();
            res.status(200).json({ message: "Suppression d'un choix réussie" });
        }
        else {
            res.status(404).json({ message: "Choix non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontré en essayant de supprimer le choix" });
    }
});
exports.deleteChoice = deleteChoice;
