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
exports.getDonationById = exports.getAllDonations = exports.createDonation = exports.getDonationsByUserId = exports.getTotalDonations = exports.getTotalDonationsMonth = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateDonation)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    try {
        const { amount, donationDate, fullname, paymentMethod, email, donationFrequency, donatorId } = value;
        if (!amount) {
            res.status(400).json({ message: "amount champ ne doit être vide" });
            return;
        }
        const newDonation = yield models_1.Donation.create({
            amount,
            donationDate,
            fullname,
            paymentMethod,
            email,
            donationFrequency,
            donatorId
        });
        res.status(201).json(newDonation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création du don." });
    }
});
exports.createDonation = createDonation;
const getAllDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield models_1.Donation.findAll();
        return res.status(200).json(donations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des dons." });
    }
});
exports.getAllDonations = getAllDonations;
const getDonationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donationId = req.params.id;
        const donation = yield models_1.Donation.findByPk(donationId);
        if (donation !== null) {
            res.status(200).json(donation);
        }
        else {
            res.status(404).json({ message: "Don non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche du don" });
    }
});
exports.getDonationById = getDonationById;
const getDonationsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const donations = yield models_1.Donation.findAll({ where: { donatorId: userId } });
        if (donations.length > 0) {
            res.status(200).json(donations);
        }
        else {
            res.status(404).json({ message: "No donations found for this user" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while retrieving donations" });
    }
});
exports.getDonationsByUserId = getDonationsByUserId;
const getTotalDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donations = yield models_1.Donation.findAll();
        const total = donations.reduce((acc, donation) => acc + donation.amount, 0);
        res.status(200).json({ totalDonations: total });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while calculating total donations" });
    }
});
exports.getTotalDonations = getTotalDonations;
const getTotalDonationsMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    try {
        const donations = yield models_1.Donation.findAll({
            where: {
                donationDate: {
                    [sequelize_1.Op.gte]: firstDayOfMonth,
                    [sequelize_1.Op.lte]: lastDayOfMonth,
                },
            },
        });
        const total = donations.reduce((acc, donation) => acc + donation.amount, 0);
        res.status(200).json({ totalDonationsMonth: total });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while calculating total donations for the month" });
    }
});
exports.getTotalDonationsMonth = getTotalDonationsMonth;
