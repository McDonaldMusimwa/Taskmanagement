"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("../services/passport");
const google_auth_library_1 = require("google-auth-library");
const user_1 = __importDefault(require("../controller/user"));
const controller = new user_1.default();
//const CLIENTURL = process.env.CLIENT_URL;
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLEINT_ID;
const router = (0, express_1.Router)();
router.post('/google', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        // Verify the Google OAuth token
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();
        if (!name || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Create a new user based on Google OAuth information
        const createdUser = yield controller.createUser(name, email, picture);
        if (createdUser)
            res.status(200).json(createdUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
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
exports.default = router;
//# sourceMappingURL=auth.js.map