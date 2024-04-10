"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isAuth = (req, res, next) => {
    //if(!req.session.connected && !req.session.user) { --> créer une variable de session ?
    res.redirect("/user/login");
    //}
    //else {
    //next()
    //}
};
exports.isAuth = isAuth;
