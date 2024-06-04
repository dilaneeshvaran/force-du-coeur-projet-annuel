"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../routers/users");
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    if (users_1.tokenRevocationList.includes(token))
        return res.status(401);
    jsonwebtoken_1.default.verify(token, 'your_secret_key', (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        req.token = token;
        next();
    });
}
exports.authenticateToken = authenticateToken;
function authorizeAdmin(req, res, next) {
    if (req.user && req.user.role == 'admin') {
        next();
    }
    else {
        res.status(403).send({ message: "Forbidden: only admins can perform this action" });
    }
}
exports.authorizeAdmin = authorizeAdmin;
