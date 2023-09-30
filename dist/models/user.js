"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthUser = exports.User = void 0;
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// Define the user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter valid email'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [6, 'Minimum length is 6 characters']
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false, // It's better to use `required` instead of `require`
    },
});
// Define the OAuth user schema
const oauthUserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
});
// Create models based on the schemas
const User = model('User', userSchema, 'users');
exports.User = User;
const OAuthUser = model('OAuthUser', oauthUserSchema, 'users');
exports.OAuthUser = OAuthUser;
//# sourceMappingURL=user.js.map