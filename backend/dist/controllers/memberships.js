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
exports.deleteMembership = exports.updateMembership = exports.getMembershipById = exports.getAllMemberships = exports.createMembership = void 0;
const validation_1 = require("../validation");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const createMembership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateMembership)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { amount, paymentDate, userId, status } = value;
        if (!amount || !userId) {
            res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const newMembership = yield models_1.Membership.create({
            amount,
            paymentDate,
            userId,
            status,
        });
        res.status(201).json(newMembership);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création d'un abonnement." });
    }
});
exports.createMembership = createMembership;
const getAllMemberships = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberships = yield models_1.Membership.findAll();
        return res.status(200).json(memberships);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des abonnements. " });
    }
});
exports.getAllMemberships = getAllMemberships;
const getMembershipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const membershipId = req.params.id;
        const membership = yield models_1.Membership.findByPk(membershipId);
        if (membership !== null) {
            res.status(200).json(membership);
        }
        else {
            res.status(404).json({ message: "Abonnement non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche d'un abonnement" });
    }
});
exports.getMembershipById = getMembershipById;
const updateMembership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const membershipId = req.params.id;
        const { amount, paymentDate, userId, status } = req.body;
        const membership = yield models_1.Membership.findByPk(membershipId);
        if (membership !== null) {
            if (amount !== undefined)
                membership.amount = amount;
            if (paymentDate !== undefined)
                membership.paymentDate = paymentDate;
            if (userId !== undefined)
                membership.userId = userId;
            if (status !== undefined)
                membership.status = status;
            yield membership.save();
            res.status(200).json(membership);
        }
        else {
            res.status(404).json({ message: "Membership not found" });
        }
    }
    catch (error) {
        middlewares_1.logger.error('Error updating membership:', error);
        return res.status(500).json({ message: "Erreur lors de la mise a jour d'un abonnement", error: error.message });
    }
});
exports.updateMembership = updateMembership;
const deleteMembership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const membershipId = req.params.id;
        const membership = yield models_1.Membership.findByPk(membershipId);
        if (membership !== null) {
            yield membership.destroy();
            res.status(200).json({ message: "Suppression de l'abonnement effectuée" });
        }
        else {
            res.status(404).json({ message: "Abonnement non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontré en essayant de supprimer l'abonnement" });
    }
});
exports.deleteMembership = deleteMembership;
