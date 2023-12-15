import { Router } from 'express';

import passport from 'passport';
import { Request, Response,NextFunction } from 'express';
import checkAuth from '../services/authCheck';
import'../services/passport';

const CLIENTURL = process.env.CLIENT_URL;

const router = Router();
//const UserController = new controller()

//router.post("/", UserController.getOneUser);

//google oAUTH2.0

router.get('/google', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })(req, res, next);
});

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/failed',
  })
);


router.get('/protected', checkAuth, (req: Request, res: Response) => {
  console.log('Handling /protected route');
  const user = req.user;
  console.log(user);
  user ? res.redirect(`/tasks/${req.user._id}`) : res.status(403).json({ message: "Not Authorized" });
});

router.get("/failed", (req: Request, res: Response) => {
  res.status(401).json({ message: "failed " });
});

router.get("/logout",checkAuth,(req,res)=>{
  req.logout();
  res.redirect(CLIENTURL)
})


export default  router;

