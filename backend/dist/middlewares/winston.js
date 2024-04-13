"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const moment_timezone_1 = require("moment-timezone");
/**
 * Middleware pour enregistrer les informations de requête dans la console.
 *
 */
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: () => (0, moment_timezone_1.tz)('Europe/Paris').format() }), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({ filename: './logs/index.log' }),
        new winston_1.default.transports.File({ filename: './logs/error.log', level: 'error' }),
        //new winston.transports.Console() --> afficher l'IP de l'utilisateur ayant lanc" une requête dans la console
    ]
});
exports.logger = logger;
