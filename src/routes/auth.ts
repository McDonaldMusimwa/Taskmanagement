import {Router} from  'express';
import controller from '../controller/user';
import passport from  'passport';
import {Request,Response} from 'express';
import checkAuth from '../services/authCheck';

const router =Router();
const UserController = new controller()

//router.post("/", UserController.getOneUser);

//google oAUTH2.0
router.get('/auth/google',passport.authenticate('google', {
    //what we want from the user
    scope: ['email', 'profile'],
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/login/auth/protected",
    failureRedirect: "/login/auth/failed",
  })
  
);

router.get("/auth/protected", checkAuth,(req:Request, res:Response) => {
  res.send("logged in ");
});

router.get("/auth/failed", (req:Request, res:Response) => {
  res.send("failed ");
});



module.exports = router;

