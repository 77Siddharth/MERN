const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./Config/database");
// config
dotenv.config({ path: "Backend/Config/config.env" });

// DATABASE
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port : ", process.env.PORT);
});
