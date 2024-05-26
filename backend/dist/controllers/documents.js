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
exports.deleteDocument = exports.updateDocument = exports.getDocumentById = exports.getAllDocuments = exports.createDocument = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateDocument)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { title, description, type, creationDate, authorId } = value;
        if (!title || !description || !type || !creationDate || !authorId) {
            res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const newDocument = yield models_1.Document.create({
            title,
            description,
            type,
            creationDate,
            authorId
        });
        res.status(201).json(newDocument);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création du document." });
    }
});
exports.createDocument = createDocument;
const getAllDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documents = yield models_1.Document.findAll();
        return res.status(200).json(documents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des documents" });
    }
});
exports.getAllDocuments = getAllDocuments;
const getDocumentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentId = req.params.id;
        const document = yield models_1.Document.findByPk(documentId);
        if (document !== null) {
            res.status(200).json(document);
        }
        else {
            res.status(404).json({ message: "Document non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche du document" });
    }
});
exports.getDocumentById = getDocumentById;
const updateDocument = (req, res) => {
};
exports.updateDocument = updateDocument;
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentId = req.params.id;
        const document = yield models_1.Document.findByPk(documentId);
        if (document !== null) {
            yield document.destroy();
            res.status(200).json({ message: "Supression du document effectuée" });
        }
        else {
            res.status(404).json({ message: "Document non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontrée en essayant de supprimer le document" });
    }
});
exports.deleteDocument = deleteDocument;
