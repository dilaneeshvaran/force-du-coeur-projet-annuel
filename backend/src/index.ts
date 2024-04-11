import express, { Request, Response } from "express";
import { documentsRouter, teamsRouter, membershipRouter, eventsRouter, healthRouter, messagesRouter, tasksRouter, missionsRouter, membersRouter, resourcesRouter, useOfResourcesRouter, choicesRouter, votesRouter, donationsRouter } from './routers';
import { errorHandler, logger, timeZoneFormatter } from "./middlewares";
import './global.data';

const app = express();
const port = process.env.PORT || 8088;

app.use(timeZoneFormatter);



app.use(logger);

app.use('/choices', choicesRouter);
app.use('/documents', documentsRouter);
app.use('/donations', donationsRouter);
app.use('/events', eventsRouter);
app.use('/health', healthRouter);
app.use('/members', membersRouter);
app.use('/membership', membershipRouter);
app.use('/messages', messagesRouter);
app.use('/missions', missionsRouter);
app.use('/resources', resourcesRouter);
app.use('/tasks', tasksRouter);
app.use('/teams', teamsRouter);
app.use('/useOfResources', useOfResourcesRouter);
app.use('/votes', votesRouter);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Port http://localhost:${port}`);
})



