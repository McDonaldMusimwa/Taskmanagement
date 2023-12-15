import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import { ConnectOptions } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
const swaggerDocument = require('../swagger-output.json');

// Import your Passport configuration
import './services/passport'; // Replace with the actual path

dotenv.config();
const port = 8080;
const DATABASEURL = process.env.DataBaseUrl;
const SECRET = process.env.SECRET;

const app = express();

// Configure and start session
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


// Configure body parser, JSON parsing, and Swagger
app.use(bodyParser.json());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-TypeError,Accept,Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET ,POST,PUT,DELETE,OPTIONS');
    next();
  })

  /*
  app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,PATCH,DELETE",
    credentials:true
  }))

  */
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
