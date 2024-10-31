require("dotenv").config();
const app = require("./src/app");
const pool = require("./src/db");
const port = process.env.PORT;

pool
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => console.log("Database connection failed:", err));
