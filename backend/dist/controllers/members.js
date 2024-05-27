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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.getMemberById = exports.getAllMembers = exports.createMember = void 0;
const validation_1 = require("../validation");
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const middlewares_1 = require("../middlewares");
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateMember)(req.body);
    if (error) {
        res.status(400).json({ message: middlewares_1.logger.error(error.details[0].message) });
    }
    try {
        const { name, firstName, email, password, role, memberSince, dateOfBirth } = value;
        if (!name || !firstName || !email || !password || !memberSince || !dateOfBirth) {
            res.status(400).json({ message: "Aucun champ ne doit être vide" });
        }
        const roleByDefault = role || 'member';
        const hashedPassword = yield bcrypt_1.default.hash(value.password, 12);
        const newMember = yield models_1.Member.create({
            name,
            firstName,
            email,
            password: hashedPassword,
            role: roleByDefault,
            memberSince,
            dateOfBirth: new Date(dateOfBirth)
        });
        res.status(201).json(newMember);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création du membre." });
    }
});
exports.createMember = createMember;
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield models_1.Member.findAll();
        return res.status(200).json(members);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des membres." });
    }
});
exports.getAllMembers = getAllMembers;
const getMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.id;
        const member = yield models_1.Member.findByPk(memberId);
        if (member !== null) {
            res.status(200).json(member);
        }
        else {
            res.status(404).json({ message: "Membre non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche du membre" });
    }
});
exports.getMemberById = getMemberById;
// mettre à jour le rôle d'un membre
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const { role } = req.body;
    try {
        const member = yield models_1.Member.findByPk(memberId);
        if (!member) {
            return res.status(400).json({ message: `Membre avec l'ID ${memberId} non retrouvé` });
        }
        if (member.role === 'member') {
            const newRole = 'admin';
            yield member.update({ role: newRole });
            const updatedMember = yield models_1.Member.findByPk(memberId);
            return res.status(200).json({ message: "Le membre est devenu un admin", updatedMember });
        }
        else {
            const newRole = 'member';
            yield member.update({ role: newRole });
            const updatedMember = yield models_1.Member.findByPk(memberId);
            return res.status(200).json({ message: "L'admin est redevenu un membre simple", updatedMember });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la mise à jour du rôle" });
    }
});
exports.updateMember = updateMember;
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberId = req.params.id;
        const member = yield models_1.Member.findByPk(memberId);
        if (member !== null) {
            // supprimer le membre de la BDD
            // pas encore de tokkens ou de sessions donc simple destroy de Sequelize
            yield member.destroy();
            res.status(200).json({ message: "Supression du membre réussi" });
        }
        else {
            res.status(404).json({ message: "Membre non retrouvé" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur rencontré en essayant de supprimer le membre" });
    }
});
exports.deleteMember = deleteMember;
