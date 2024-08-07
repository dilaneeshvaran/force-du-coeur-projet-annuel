/**
 * Point d'entrée pour exporter tous les routeurs des différentes sections de l'application.
 * Les autres parties de l'app peuvent importer ces routeurs.
 */

export { router as healthRouter } from './health';
export { router as membershipsRouter } from './memberships';
export { router as eventsRouter } from './events';
export { router as documentsRouter } from './documents';
export { router as messagesRouter } from './messages';
export { router as tasksRouter } from './tasks';
export { router as resourcesRouter } from './resources';
export { router as useOfResourcesRouter } from './useOfResources';
export { router as optionsRouter } from './option';
export { router as votesRouter } from './votes';
export { router as donationsRouter } from './donations';
export { router as usersRouter } from './users';
export { default as uploadRouter } from './upload';//export { router as authRouter } from './auth';
export { router as participationsRouter } from './participation';
export { default as userVotesRouter } from './user_votes';
export { router as paymentRouter } from './payment';
export { router as alertsRouter } from './alerts';