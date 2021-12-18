const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./Config/database");

// uncaughtException - defining variables that don't exist
process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("Shutting down server - uncaughtException");
  process.exit(1);
});

// config
dotenv.config({ path: "Backend/Config/config.env" });

// DATABASE
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const server = app.listen(process.env.PORT, () => {
  console.log("Server is running on port : ", process.env.PORT);
});

// Unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log("Error: ", err.message);
  console.log("Shutting down server - Unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});