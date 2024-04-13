"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res, next) => {
    //if(!req.session.connected && !req.session.user) { --> créer une variable de session ? ou plutôt utiliser des tokkens
    res.redirect("/members/login");
    //}
    //else {
    //next()
    //}
};
exports.isAuth = isAuth;
