"use strict";
/**
 * Point d'entrée pour exporter tous les routeurs des différentes sections de l'application.
 * Les autres parties de l'app peuvent importer ces routeurs.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationsRouter = exports.votesRouter = exports.choicesRouter = exports.useOfResourcesRouter = exports.resourcesRouter = exports.missionsRouter = exports.tasksRouter = exports.messagesRouter = exports.documentsRouter = exports.membersRouter = exports.eventsRouter = exports.membershipRouter = exports.teamsRouter = exports.healthRouter = void 0;
var health_1 = require("./health");
Object.defineProperty(exports, "healthRouter", { enumerable: true, get: function () { return health_1.router; } });
var teams_1 = require("./teams");
Object.defineProperty(exports, "teamsRouter", { enumerable: true, get: function () { return teams_1.router; } });
var membership_1 = require("./membership");
Object.defineProperty(exports, "membershipRouter", { enumerable: true, get: function () { return membership_1.router; } });
var events_1 = require("./events");
Object.defineProperty(exports, "eventsRouter", { enumerable: true, get: function () { return events_1.router; } });
var members_1 = require("./members");
Object.defineProperty(exports, "membersRouter", { enumerable: true, get: function () { return members_1.router; } });
var documents_1 = require("./documents");
Object.defineProperty(exports, "documentsRouter", { enumerable: true, get: function () { return documents_1.router; } });
var messages_1 = require("./messages");
Object.defineProperty(exports, "messagesRouter", { enumerable: true, get: function () { return messages_1.router; } });
var tasks_1 = require("./tasks");
Object.defineProperty(exports, "tasksRouter", { enumerable: true, get: function () { return tasks_1.router; } });
var missions_1 = require("./missions");
Object.defineProperty(exports, "missionsRouter", { enumerable: true, get: function () { return missions_1.router; } });
var resources_1 = require("./resources");
Object.defineProperty(exports, "resourcesRouter", { enumerable: true, get: function () { return resources_1.router; } });
var useOfResources_1 = require("./useOfResources");
Object.defineProperty(exports, "useOfResourcesRouter", { enumerable: true, get: function () { return useOfResources_1.router; } });
var choices_1 = require("./choices");
Object.defineProperty(exports, "choicesRouter", { enumerable: true, get: function () { return choices_1.router; } });
var votes_1 = require("./votes");
Object.defineProperty(exports, "votesRouter", { enumerable: true, get: function () { return votes_1.router; } });
var donations_1 = require("./donations");
Object.defineProperty(exports, "donationsRouter", { enumerable: true, get: function () { return donations_1.router; } });
