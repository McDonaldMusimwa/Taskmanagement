"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authCheck_1 = __importDefault(require("../services/authCheck"));
require("../services/passport");
const CLIENTURL = process.env.CLIENT_URL;
const router = (0, express_1.Router)();
//const UserController = new controller()
//router.post("/", UserController.getOneUser);
//google oAUTH2.0
router.get('/google', (req, res, next) => {
    passport_1.default.authenticate('google', {
        scope: ['email', 'profile'],
    })(req, res, next);
});
router.get('/google/redirect', passport_1.default.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/failed',
}));
router.get('/protected', authCheck_1.default, (req, res) => {
    console.log('Handling /protected route');
    const user = req.user;
    console.log(user);
    user ? res.redirect(`/tasks/${req.user._id}`) : res.status(403).json({ message: "Not Authorized" });
});
router.get("/failed", (req, res) => {
    res.status(401).json({ message: "failed " });
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENTURL);
});
exports.default = router;
//# sourceMappingURL=auth.js.map