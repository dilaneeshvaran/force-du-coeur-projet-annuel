import express, {Request, Response, NextFunction }  from "express"
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    //if(!req.session.connected && !req.session.user) { --> créer une variable de session ?
        res.redirect("/user/login")
    //}
    //else {
        //next()
    //}
}