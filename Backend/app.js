const errorHandler = require("./Middlewares/error");
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/v1", product);
app.use("/api/v1", user);
// Middleware
app.use(errorHandler);

module.exports = app;
