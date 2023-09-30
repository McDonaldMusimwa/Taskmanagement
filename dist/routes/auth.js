"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controller/user"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const UserController = new user_1.default();
//router.post("/", UserController.getOneUser);
//google oAUTH2.0
router.get('/google', passport_1.default.authenticate('google', {
    //what we want from the user
    scope: ["email", "profile"],
}));
router.get("/auth/google/redirect", passport_1.default.authenticate("google", {
    successRedirect: "/tasks",
    failureRedirect: "/login",
}));
router.get("/protected", (req, res) => {
    res.send("logged in ");
});
router.get("/failed", (req, res) => {
    res.send("failed ");
});
module.exports = router;
//# sourceMappingURL=auth.js.map