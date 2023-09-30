
import { Request, Response, NextFunction } from 'express';


export default function AuthenticationCheck(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        return next()

    }
    res.status(401).redirect('/login')

}

