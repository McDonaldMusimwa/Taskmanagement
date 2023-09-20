const express = require('express');
require('dotenv').config();
const PORT = 8080;
const swaggerUi = require('swagger-ui-express');
//database config
const mongose = require('mongoose');
const bodyParser = require('body-parser');
const DATABASEURL = process.env.DataBaseUrl;
const app = express();
//Routes
app.use(express.json());
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require("./routes/index"));
let db;
mongose
    .connect(DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "taskator",
})
    .then((result) => {
    app.listen(PORT);
    db = result;
    console.log("connection to database successful");
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map