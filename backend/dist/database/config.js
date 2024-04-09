"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dbParams = {
    host: 'localhost',
    user: 'root',
    password: 'force',
    database: 'f-du-coeur'
};
const connection = mysql_1.default.createConnection({
    host: dbParams.host,
    user: dbParams.user,
    password: dbParams.password,
    database: dbParams.database
});
exports.default = dbParams;
