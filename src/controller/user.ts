import { Request, Response, NextFunction } from 'express';
import { User, OAuthUser } from '../models/user'; // Correctly import the 'NewUser' model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { passport, DoneFunction } from 'passport';
const JWTTOKEN = process.env.JWTTOKEN;
import dotenv from 'dotenv';
dotenv.config();



export default class UserController {
    public async createUser(name: string, email: string, picture: string): Promise<object> {
        try {
            // Check if a user with the same email already exists
            const existingUser = await User.findOne({ email });
    
            if (existingUser) {
                // If a user with the same email exists, you may want to handle this situation
                return existingUser
            }
    
            // If no user with the same email exists, proceed to create a new user
            const newUser = {
                firstname: name,
                email: email,
                picture: picture
            };
    
            const Userresult = new User(newUser);
            const createdUser = await Userresult.save();
            
            return createdUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const response = await User.find()
            //console.log(response)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const retrievedUser = await User.findOne({ email: email });
            console.log(retrievedUser);

            if (!retrievedUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            const retrievedPassword: string = retrievedUser.password;
            const isValidPassword = await bcrypt.compare(password, retrievedPassword);

            if (!isValidPassword) {
                res.status(401).json({ error: 'Incorrect Password' });
                return;
            }

            const token = jwt.sign(
                {
                    userId: retrievedUser._id.toString(),
                    email: retrievedUser.email,
                },
                JWTTOKEN!,
                { expiresIn: '1h' }
            );

            // Do not call done() manually here
            retrievedUser.token = token;
            res.status(200).json(retrievedUser);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

}
