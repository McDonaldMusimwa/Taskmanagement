import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuthUser } from '../models/user';
import { DoneFunction } from 'passport';

dotenv.config();

const CLIENTID = process.env.GOOGLE_CLIENT_ID;
const CLIENTSECRET = process.env.GOOGLE_CLIENT_SECRET;

const JWTTOKEN = process.env.JWTTOKEN;

passport.serializeUser((user: any, done: DoneFunction) => {
  console.log("User has been serialised")
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: DoneFunction) => {
  try {
    const user = await OAuthUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      // OPTIONS FOR GOOGLE STRATEGY
      
      clientID: CLIENTID,
      clientSecret: CLIENTSECRET,
      callbackURL: 'http://localhost:8080/login/auth/google/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      
      //#swagger.tags=['User']
      try {
        // passport callback function
        const currentUser = await OAuthUser.findOne({ googleId: profile.id });
        
        if (currentUser) {
          // Already in the database
          const token = jwt.sign(
            { userId: currentUser._id.toString(), email: currentUser.email },
            JWTTOKEN!,
            { expiresIn: '1h' }
          );

          currentUser.token = token;
          await currentUser.save();
          done(null, currentUser);
          console.log(currentUser.token)
        } else {
          // If not, create a new user
          const newUser = await new OAuthUser({
            firstname: profile.given_name,
            lastname: profile.family_name,
            picture: profile.picture,
            email: profile.email,
            googleId: profile.id,
          }).save();

          // Generate a token and attach it to the user object
          const token = jwt.sign(
            
            { userId: newUser._id.toString(), email: newUser.email },
            JWTTOKEN!,
            { expiresIn: '1h' }
            
          );

          newUser.token = token;
          await newUser.save();
          done(null, newUser);
          console.log(newUser)
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
