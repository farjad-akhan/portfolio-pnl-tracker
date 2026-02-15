// src/app.js

const express = require("express");
const PortfolioEngine = require("./portfolioEngine");
const createRoutes = require("./routes");

const app = express();
const port = 3000;

app.use(express.json());

const engine = new PortfolioEngine();

app.use("/", createRoutes(engine));

app.listen(port, () => {
  console.log(`Portfolio Tracker running on port ${port}`);
});
