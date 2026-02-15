// src/routes.js

const express = require("express");

const LATEST_PRICES = {
  BTC: 44000,
  ETH: 2000
};

module.exports = (engine) => {
  const router = express.Router();

  router.post("/trades", (req, res) => {
    try {
      engine.addTrade(req.body);
      res.status(201).json({ message: "Trade added successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get("/portfolio", (req, res) => {
    res.json(engine.getPortfolio());
  });

  router.get("/pnl", (req, res) => {
    res.json(engine.getPnL(LATEST_PRICES));
  });

  return router;
};
