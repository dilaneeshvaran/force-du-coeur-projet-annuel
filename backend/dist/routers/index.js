"use strict";
/**
 * Point d'entrée pour exporter tous les routeurs des différentes sections de l'application.
 * Les autres parties de l'app peuvent importer ces routeurs.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.soutenirRouter = exports.rejoindreRouter = exports.monAssociationRouter = exports.missionsRouter = exports.mesTachesRouter = exports.messagesRouter = exports.mesDocumentsRouter = exports.homeRouter = exports.evenementsRouter = exports.espaceMembresRouter = exports.equipesRouter = exports.contactRouter = exports.healthRouter = void 0;
var health_1 = require("./health");
Object.defineProperty(exports, "healthRouter", { enumerable: true, get: function () { return health_1.router; } });
var contact_1 = require("./contact");
Object.defineProperty(exports, "contactRouter", { enumerable: true, get: function () { return contact_1.router; } });
var equipes_1 = require("./equipes");
Object.defineProperty(exports, "equipesRouter", { enumerable: true, get: function () { return equipes_1.router; } });
var espaceMembres_1 = require("./espaceMembres");
Object.defineProperty(exports, "espaceMembresRouter", { enumerable: true, get: function () { return espaceMembres_1.router; } });
var evenements_1 = require("./evenements");
Object.defineProperty(exports, "evenementsRouter", { enumerable: true, get: function () { return evenements_1.router; } });
var home_1 = require("./home");
Object.defineProperty(exports, "homeRouter", { enumerable: true, get: function () { return home_1.router; } });
var mesDocuments_1 = require("./mesDocuments");
Object.defineProperty(exports, "mesDocumentsRouter", { enumerable: true, get: function () { return mesDocuments_1.router; } });
var messages_1 = require("./messages");
Object.defineProperty(exports, "messagesRouter", { enumerable: true, get: function () { return messages_1.router; } });
var mesTaches_1 = require("./mesTaches");
Object.defineProperty(exports, "mesTachesRouter", { enumerable: true, get: function () { return mesTaches_1.router; } });
var missions_1 = require("./missions");
Object.defineProperty(exports, "missionsRouter", { enumerable: true, get: function () { return missions_1.router; } });
var monAssociation_1 = require("./monAssociation");
Object.defineProperty(exports, "monAssociationRouter", { enumerable: true, get: function () { return monAssociation_1.router; } });
var rejoindre_1 = require("./rejoindre");
Object.defineProperty(exports, "rejoindreRouter", { enumerable: true, get: function () { return rejoindre_1.router; } });
var soutenir_1 = require("./soutenir");
Object.defineProperty(exports, "soutenirRouter", { enumerable: true, get: function () { return soutenir_1.router; } });
