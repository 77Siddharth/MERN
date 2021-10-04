const errorHandler = require("./Middlewares/error");
const product = require("./Routes/productRoute");

const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/v1", product);

// Middleware
app.use(errorHandler);

module.exports = app;
