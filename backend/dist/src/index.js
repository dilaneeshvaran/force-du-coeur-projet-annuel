"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = require("./routers");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
const port = 8088;
app.use(middlewares_1.timestamp);
app.use(middlewares_1.logger);
app.use('/about', routers_1.aboutRouter);
app.use('/admin', routers_1.adminRouter);
app.use('/contact', routers_1.contactRouter);
app.use('/donations', routers_1.donationsRouter);
app.use('/events', routers_1.eventsRouter);
app.use('/health', routers_1.healthRouter);
app.use('/news', routers_1.newsRouter);
app.use('/projects', routers_1.projectsRouter);
app.use('/volunteers', routers_1.volunteersRouter);
app.use(middlewares_1.errorHandler);
app.listen(port, () => {
    console.log(`Port http://localhost:${port}`);
});
