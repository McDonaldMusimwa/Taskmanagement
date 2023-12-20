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
const user_1 = require("../models/user"); // Correctly import the 'NewUser' model
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTTOKEN = process.env.JWTTOKEN;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserController {
    createUser(name, email, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a user with the same email already exists
                const existingUser = yield user_1.User.findOne({ email });
                if (existingUser) {
                    // If a user with the same email exists, you may want to handle this situation
                    return existingUser;
                }
                // If no user with the same email exists, proceed to create a new user
                const newUser = {
                    firstname: name,
                    email: email,
                    picture: picture
                };
                const Userresult = new user_1.User(newUser);
                const createdUser = yield Userresult.save();
                return createdUser;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_1.User.find();
                //console.log(response)
                res.status(200).json(response);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const retrievedUser = yield user_1.User.findOne({ email: email });
                console.log(retrievedUser);
                if (!retrievedUser) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }
                const retrievedPassword = retrievedUser.password;
                const isValidPassword = yield bcrypt_1.default.compare(password, retrievedPassword);
                if (!isValidPassword) {
                    res.status(401).json({ error: 'Incorrect Password' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({
                    userId: retrievedUser._id.toString(),
                    email: retrievedUser.email,
                }, JWTTOKEN, { expiresIn: '1h' });
                // Do not call done() manually here
                retrievedUser.token = token;
                res.status(200).json(retrievedUser);
            }
            catch (error) {
                res.status(500).json({ error });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.js.map