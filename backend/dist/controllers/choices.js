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
exports.deleteOption = exports.updateOption = exports.getOptionById = exports.getAllOptions = exports.createOption = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const createOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateOption)(req.body);
    if (error) {
        res.status(400).json({ message: middlewares_1.logger.error(error.details[0].message) });
    }
    try {
        const { label } = value;
        if (!label) {
            res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const newOption = yield models_1.Option.create({ label });
        res.status(201).json(newOption);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'option." });
    }
});
exports.createOption = createOption;
const getAllOptions = (req, res) => {
};
exports.getAllOptions = getAllOptions;
const getOptionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = yield models_1.Option.findAll();
        return res.status(200).json(options);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des options." });
    }
});
exports.getOptionById = getOptionById;
const updateOption = (req, res) => {
    // TODO
};
exports.updateOption = updateOption;
const deleteOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const optionId = req.params.id;
        const option = yield models_1.Option.findByPk(optionId);
        if (option !== null) {
            yield option.destroy();
            res.status(200).json({ message: "Suppression d'une option réussie" });
        }
        else {
            res.status(404).json({ message: "Option non retrouvée" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontrée en essayant de supprimer l'option" });
    }
});
exports.deleteOption = deleteOption;
