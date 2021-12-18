const errorHandler = require("./Middlewares/error");
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
const order = require("./Routes/orderRoute");

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware
app.use(errorHandler);

module.exports = app;
