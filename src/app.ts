import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { ConnectOptions } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument= require('../swagger-output.json');

// Import your Passport configuration
import './services/passport'; // Replace with the actual path

dotenv.config();
const port = 8080;
const DATABASEURL = process.env.DataBaseUrl;
const SECRET = process.env.SECRET;

const app = express();

// Configure session
app.use(session({
  secret: SECRET, // Replace with a strong and secure secret
  resave: false,
  saveUninitialized: true,
  // Additional session options go here, like store, cookie settings, etc.
}));

// Initialize Passport and configure it to use sessions
app.use(passport.initialize());
app.use(passport.session());

// Configure body parser, JSON parsing, and Swagger
app.use(bodyParser.json());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define your routes after configuring Passport
app.use("/", require("./routes/index"));

const options: ConnectOptions = {
  // useUnifiedTopology: true,
  dbName: "taskator",
};

mongoose
  .connect(DATABASEURL, options)
  .then((result) => {
    app.listen(port);
    console.log("Connection to database successful =>");
  })
  .catch((err) => {
    console.log(err);
  });
