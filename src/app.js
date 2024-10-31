const express = require("express");
const app = express();
const routes = require("./routes/Routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sup shawty");
});

app.use("/api", routes);

module.exports = app;
