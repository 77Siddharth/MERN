const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./Config/database");

// uncaughtException - defining variables that don't exist
process.on('uncaughtException',(err)=>{
    console.log(err.message);
  console.log("Shutting down server - uncaughtException");
    process.exit(1);
})

// config
dotenv.config({ path: "Backend/Config/config.env" });

// DATABASE
connectDatabase();

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