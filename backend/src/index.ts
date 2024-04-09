import express, { Request, Response } from "express";
import { contactRouter, equipesRouter, espaceMembresRouter, evenementsRouter, healthRouter, homeRouter, mesDocumentsRouter, messagesRouter, mesTachesRouter, missionsRouter, monAssociationRouter, rejoindreRouter, soutenirRouter } from './routers';
import { errorHandler, logger, timeZoneFormatter } from "./middlewares";
import './global.data';

const app = express();
const port = process.env.PORT || 8088;

app.use(timeZoneFormatter);



app.use(logger);

app.use('/contact', contactRouter);
app.use('/equipes', equipesRouter);
app.use('/espaceMembres', espaceMembresRouter);
app.use('/evenements', evenementsRouter);
app.use('/health', healthRouter);
app.use('/home', homeRouter);
app.use('/mesDocuments', mesDocumentsRouter);
app.use('/messages', messagesRouter);
app.use('/mesTaches', mesTachesRouter);
app.use('/missions', missionsRouter);
app.use('/monAssociation', monAssociationRouter);
app.use('/rejoindre', rejoindreRouter);
app.use('/soutenir', soutenirRouter);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Port http://localhost:${port}`);
})



