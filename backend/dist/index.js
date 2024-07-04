"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require('cors');
const routers_1 = require("./routers");
const middlewares_1 = require("./middlewares");
require("./global.data");
const app = (0, express_1.default)();
// utiliser la variable d'environnement PORT si elle est définie, sinon utiliser le port 8088
const port = process.env.PORT || 8088;
// analyser le corps de requêtes en JSON
// Use bodyParser.json() for all routes except the Stripe webhook route
app.use((req, res, next) => {
    if (req.originalUrl === '/payments/webhook') {
        next();
    }
    else {
        body_parser_1.default.json()(req, res, next);
    }
});
app.use(middlewares_1.timeZoneFormatter);
app.use(middlewares_1.winston);
app.use(cors());
app.use('/alerts', routers_1.alertsRouter);
app.use('/documents', routers_1.documentsRouter);
app.use('/donations', routers_1.donationsRouter);
app.use('/events', routers_1.eventsRouter);
app.use('/health', routers_1.healthRouter);
app.use('/memberships', routers_1.membershipsRouter);
app.use('/messages', routers_1.messagesRouter);
app.use('/resources', routers_1.resourcesRouter);
app.use('/tasks', routers_1.tasksRouter);
app.use('/useOfResources', routers_1.useOfResourcesRouter);
app.use('/votes', routers_1.votesRouter);
app.use('/users', routers_1.usersRouter);
app.use('/upload', routers_1.uploadRouter);
app.use('/upload', express_1.default.static('upload'));
app.use('/options', routers_1.optionsRouter);
app.use('/participations', routers_1.participationsRouter);
app.use('/user_votes', routers_1.userVotesRouter);
app.use('/payments', routers_1.paymentRouter);
app.use(middlewares_1.errorHandler);
app.listen(port, () => {
    console.log(`Port http://localhost:${port}`);
});
