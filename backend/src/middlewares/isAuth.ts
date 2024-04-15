import express, { Request, Response, NextFunction }  from "express"

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    //if(!req.session.connected && !req.session.user) { --> créer une variable de session ? ou plutôt utiliser des tokkens
        res.redirect("/members/login");
    //}
    //else {
        //next()
    //}
}