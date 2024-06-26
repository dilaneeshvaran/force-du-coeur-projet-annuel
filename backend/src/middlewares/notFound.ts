import  express, { Request, Response, NextFunction }  from "express"

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.redirect("/");
    next();
}