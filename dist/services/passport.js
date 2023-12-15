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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
dotenv_1.default.config();
const CLIENTID = process.env.GOOGLE_CLIENT_ID;
const CLIENTSECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWTTOKEN = process.env.JWTTOKEN;
passport_1.default.serializeUser((user, done) => {
    done(null, user.userId);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.OAuthUser.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    // OPTIONS FOR GOOGLE STRATEGY
    clientID: CLIENTID,
    clientSecret: CLIENTSECRET,
    callbackURL: 'http://localhost:8080/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    //#swagger.tags=['User']
    try {
        // passport callback function
        const currentUser = yield user_1.OAuthUser.findOne({ googleId: profile.id });
        if (currentUser) {
            // Already in the database
            const token = jsonwebtoken_1.default.sign({ userId: currentUser._id.toString(), email: currentUser.email }, JWTTOKEN, { expiresIn: '1h' });
            currentUser.token = token;
            yield currentUser.save();
            return done(null, { userId: currentUser._id.toString(), token, user: currentUser.toJSON() });
        }
        else {
            // If not, create a new user
            const newUser = yield new user_1.OAuthUser({
                firstname: profile.given_name,
                lastname: profile.family_name,
                picture: profile.picture,
                email: profile.email,
                googleId: profile.id,
            }).save();
            // Generate a token and attach it to the user object
            const token = jsonwebtoken_1.default.sign({ userId: newUser._id.toString(), email: newUser.email }, JWTTOKEN, { expiresIn: '1h' });
            newUser.token = token;
            yield newUser.save();
            return done(null, { userId: newUser._id.toString(), token, user: newUser.toJSON() });
        }
    }
    catch (error) {
        done(error);
    }
})));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map