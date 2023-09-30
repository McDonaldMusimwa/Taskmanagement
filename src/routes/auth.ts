import {Router} from  'express';
import controller from '../controller/user';
import passport from  'passport';
import {Request,Response} from 'express';
import passportService from '../services/passport';

const router =Router();
const UserController = new controller()

//router.post("/", UserController.getOneUser);

//google oAUTH2.0
router.get('/google',passport.authenticate('google', {
    //what we want from the user
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/tasks",
    failureRedirect: "/login",
  })
  
);


router.get("/protected", (req:Request, res:Response) => {
  res.send("logged in ");
});

router.get("/failed", (req:Request, res:Response) => {
  res.send("failed ");
});

module.exports = router;
