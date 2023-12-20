import { Router } from 'express';

import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import checkAuth from '../services/authCheck';
import '../services/passport';
import { OAuth2Client } from 'google-auth-library';
import userController from '../controller/user';
import { couldStartTrivia } from 'typescript';
const controller = new userController();

//const CLIENTURL = process.env.CLIENT_URL;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLEINT_ID;



const router = Router();

router.post('/google', async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
      // Verify the Google OAuth token
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: GOOGLE_CLIENT_ID
      });

     
      const { name, email, picture } = ticket.getPayload();
      if (!name || !email) {
          return res.status(400).json({ error: 'Missing required fields' });
      }
     
      // Create a new user based on Google OAuth information
      const createdUser = await controller.createUser(name, email, picture);

      if(createdUser)res.status(200).json(createdUser);
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


//const UserController = new controller()

//router.post("/", UserController.getOneUser);

//google oAUTH2.0
/*
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
*/

export default router;

