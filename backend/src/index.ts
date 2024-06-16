import express from "express";
import bodyParser from "body-parser";
const cors = require('cors');
import {userVotesRouter,participationsRouter,uploadRouter,optionsRouter, documentsRouter, membershipsRouter, eventsRouter, healthRouter, messagesRouter, tasksRouter, resourcesRouter, useOfResourcesRouter, votesRouter, donationsRouter, usersRouter } from './routers';
import { errorHandler, logger, timeZoneFormatter, winston } from "./middlewares";
import './global.data';

const app = express();

// utiliser la variable d'environnement PORT si elle est définie, sinon utiliser le port 8088
const port = process.env.PORT || 8088;

// analyser le corps de requêtes en JSON
app.use(bodyParser.json());
app.use(timeZoneFormatter);
app.use(winston);
app.use(cors());

app.use('/documents', documentsRouter);
app.use('/donations', donationsRouter);
app.use('/events', eventsRouter);
app.use('/health', healthRouter);
app.use('/memberships', membershipsRouter);
app.use('/messages', messagesRouter);
app.use('/resources', resourcesRouter);
app.use('/tasks', tasksRouter);
app.use('/useOfResources', useOfResourcesRouter);
app.use('/votes', votesRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/upload', express.static('upload'))
app.use('/options', optionsRouter);
app.use('/participations', participationsRouter);
app.use('/user_votes', userVotesRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Port http://localhost:${port}`);
})



