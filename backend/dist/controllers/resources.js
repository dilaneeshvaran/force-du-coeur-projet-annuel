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
exports.deleteResource = exports.updateResource = exports.getResourceById = exports.getAllResources = exports.createResource = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateResource)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { label, type, description } = value;
        if (!label || !type || !description) {
            res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const newResource = yield models_1.Resource.create({
            label,
            type,
            description
        });
        res.status(201).json(newResource);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la ressource." });
    }
});
exports.createResource = createResource;
const getAllResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield models_1.Resource.findAll();
        return res.status(200).json(resources);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des ressources. " });
    }
});
exports.getAllResources = getAllResources;
const getResourceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resourceId = req.params.id;
        const resource = yield models_1.Resource.findByPk(resourceId);
        if (resource !== null) {
            res.status(200).json(resource);
        }
        else {
            res.status(404).json({ message: "Ressource non retrouvée" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche de la ressource" });
    }
});
exports.getResourceById = getResourceById;
const updateResource = (req, res) => {
    // TODO
};
exports.updateResource = updateResource;
const deleteResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resourceId = req.params.id;
        const resource = yield models_1.Resource.findByPk(resourceId);
        if (resource !== null) {
            yield resource.destroy();
            res.status(200).json({ message: "Suppression de la ressource effectuée" });
        }
        else {
            res.status(404).json({ message: "Tâche non retrouvée" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontré en essayant de supprimer la ressource" });
    }
});
exports.deleteResource = deleteResource;
