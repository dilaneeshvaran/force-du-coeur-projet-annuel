"use strict";
/**
 * Point d'entrée pour exporter tous les routeurs des différentes sections de l'application.
 * Les autres parties de l'app peuvent importer ces routeurs.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = exports.userVotesRouter = exports.participationsRouter = exports.uploadRouter = exports.usersRouter = exports.donationsRouter = exports.votesRouter = exports.optionsRouter = exports.useOfResourcesRouter = exports.resourcesRouter = exports.tasksRouter = exports.messagesRouter = exports.documentsRouter = exports.eventsRouter = exports.membershipsRouter = exports.healthRouter = void 0;
var health_1 = require("./health");
Object.defineProperty(exports, "healthRouter", { enumerable: true, get: function () { return health_1.router; } });
var memberships_1 = require("./memberships");
Object.defineProperty(exports, "membershipsRouter", { enumerable: true, get: function () { return memberships_1.router; } });
var events_1 = require("./events");
Object.defineProperty(exports, "eventsRouter", { enumerable: true, get: function () { return events_1.router; } });
var documents_1 = require("./documents");
Object.defineProperty(exports, "documentsRouter", { enumerable: true, get: function () { return documents_1.router; } });
var messages_1 = require("./messages");
Object.defineProperty(exports, "messagesRouter", { enumerable: true, get: function () { return messages_1.router; } });
var tasks_1 = require("./tasks");
Object.defineProperty(exports, "tasksRouter", { enumerable: true, get: function () { return tasks_1.router; } });
var resources_1 = require("./resources");
Object.defineProperty(exports, "resourcesRouter", { enumerable: true, get: function () { return resources_1.router; } });
var useOfResources_1 = require("./useOfResources");
Object.defineProperty(exports, "useOfResourcesRouter", { enumerable: true, get: function () { return useOfResources_1.router; } });
var option_1 = require("./option");
Object.defineProperty(exports, "optionsRouter", { enumerable: true, get: function () { return option_1.router; } });
var votes_1 = require("./votes");
Object.defineProperty(exports, "votesRouter", { enumerable: true, get: function () { return votes_1.router; } });
var donations_1 = require("./donations");
Object.defineProperty(exports, "donationsRouter", { enumerable: true, get: function () { return donations_1.router; } });
var users_1 = require("./users");
Object.defineProperty(exports, "usersRouter", { enumerable: true, get: function () { return users_1.router; } });
var upload_1 = require("./upload"); //export { router as authRouter } from './auth';
Object.defineProperty(exports, "uploadRouter", { enumerable: true, get: function () { return __importDefault(upload_1).default; } });
var participation_1 = require("./participation");
Object.defineProperty(exports, "participationsRouter", { enumerable: true, get: function () { return participation_1.router; } });
var user_votes_1 = require("./user_votes");
Object.defineProperty(exports, "userVotesRouter", { enumerable: true, get: function () { return __importDefault(user_votes_1).default; } });
var payment_1 = require("./payment");
Object.defineProperty(exports, "paymentRouter", { enumerable: true, get: function () { return payment_1.router; } });
