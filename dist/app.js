"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require('../swagger-output.json');
// Import your Passport configuration
require("./services/passport"); // Replace with the actual path
dotenv_1.default.config();
const port = 8080;
const DATABASEURL = process.env.DataBaseUrl;
const SECRET = process.env.SECRET;
const app = (0, express_1.default)();
// Configure session
app.use((0, express_session_1.default)({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    // Additional session options go here, like store, cookie settings, etc.
}));
// Initialize Passport and configure it to use sessions
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Configure body parser, JSON parsing, and Swagger
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Define your routes after configuring Passport
app.use("/", require("./routes/index"));
const options = {
    // useUnifiedTopology: true,
    dbName: "taskator",
};
mongoose_1.default
    .connect(DATABASEURL, options)
    .then((result) => {
    app.listen(port);
    console.log("Connection to database successful =>");
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map