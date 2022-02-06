const errorHandler = require("./Middlewares/error");
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
const order = require("./Routes/orderRoute");
const payments = require("./Routes/paymentRoute");
const cors = require("cors");

const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "Backend/Config/config.env" });
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payments);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware
app.use(errorHandler);

module.exports = app;
