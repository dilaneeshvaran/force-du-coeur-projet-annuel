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
exports.deleteVote = exports.updateVote = exports.getVoteById = exports.getAllVotes = exports.createVote = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const createVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateVote)(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        console.log('Received data:', req.body);
        const { title, description, startDate, endDate, votingType, ongoingRound, votingMethod, status, createdBy, voterId } = value;
        if (!title || !description || !startDate || !endDate || !votingType || !ongoingRound || !votingMethod || !status) {
            return res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const newVote = yield models_1.Vote.create({
            title,
            description,
            startDate,
            endDate,
            votingType,
            ongoingRound,
            votingMethod,
            status,
            createdBy,
            voterId
        });
        return res.status(201).json(newVote);
    }
    catch (error) {
        middlewares_1.logger.error('Error creating vote:', error);
        return res.status(500).json({ message: "Erreur lors de la création d'un vote", error: error.message });
    }
});
exports.createVote = createVote;
const getAllVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const votes = yield models_1.Vote.findAll();
        return res.status(200).json(votes);
    }
    catch (error) {
        middlewares_1.logger.error(error);
        return res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des évènements" });
    }
});
exports.getAllVotes = getAllVotes;
const getVoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voteId = req.params.id;
        const vote = yield models_1.Vote.findByPk(voteId);
        if (vote !== null) {
            return res.status(200).json(vote);
        }
        else {
            return res.status(404).json({ message: "Membre non retrouvé" });
        }
    }
    catch (error) {
        middlewares_1.logger.error(error);
        return res.status(500).json({ message: "Erreur lors de la recherche du membre" });
    }
});
exports.getVoteById = getVoteById;
const updateVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voteId = req.params.id;
        const { title, description, startDate, endDate, votingType, ongoingRound, votingMethod, status, createdBy, voterId } = req.body;
        const vote = yield models_1.Vote.findByPk(voteId);
        if (vote !== null) {
            if (title !== undefined)
                vote.title = title;
            if (description !== undefined)
                vote.description = description;
            if (startDate !== undefined)
                vote.startDate = new Date(startDate);
            if (endDate !== undefined)
                vote.endDate = new Date(endDate);
            if (votingType !== undefined)
                vote.votingType = votingType;
            if (ongoingRound !== undefined)
                vote.ongoingRound = ongoingRound;
            if (votingMethod !== undefined)
                vote.votingMethod = votingMethod;
            if (status !== undefined)
                vote.status = status;
            if (createdBy !== undefined)
                vote.createdBy = createdBy;
            if (voterId !== undefined)
                vote.voterId = voterId;
            yield vote.save();
            res.status(200).json(vote);
        }
        else {
            res.status(404).json({ message: "Vote not found." });
        }
    }
    catch (error) {
        console.error('Error updating vote:', error);
        res.status(500).json({ message: "Error updating the vote." });
    }
});
exports.updateVote = updateVote;
const deleteVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voteId = req.params.id;
        const vote = yield models_1.Vote.findByPk(voteId);
        if (vote !== null) {
            yield vote.destroy();
            return res.status(200).json({ message: "Suppression du vote réussie" });
        }
        else {
            return res.status(404).json({ message: "Vote non retrouvé" });
        }
    }
    catch (error) {
        middlewares_1.logger.error(error);
        return res.status(500).json({ message: "Erreur rencontrée en essayant de supprimer le vote" });
    }
});
exports.deleteVote = deleteVote;
