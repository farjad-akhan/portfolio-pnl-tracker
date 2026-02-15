// src/portfolioEngine.js

class PortfolioEngine {
  constructor() {
    // { BTC: { quantity, avgPrice, realizedPnL } }
    this.positions = {};
  }

  addTrade(trade) {
    const { symbol, side, price, quantity } = trade;

    if (!symbol || !side || price == null || quantity == null) {
      throw new Error("Missing required fields");
    }

    if (price <= 0 || quantity <= 0) {
      throw new Error("Price and quantity must be positive");
    }

    const upperSide = side.toUpperCase();

    if (upperSide !== "BUY" && upperSide !== "SELL") {
      throw new Error("Side must be BUY or SELL");
    }

    if (!this.positions[symbol]) {
      this.positions[symbol] = {
        quantity: 0,
        avgPrice: 0,
        realizedPnL: 0
      };
    }

    const position = this.positions[symbol];

    if (upperSide === "BUY") {
      const totalCost =
        position.avgPrice * position.quantity +
        price * quantity;

      position.quantity += quantity;
      position.avgPrice = totalCost / position.quantity;
    }

    if (upperSide === "SELL") {
      if (position.quantity === 0) {
        throw new Error("No holdings available to sell");
      }

      if (quantity > position.quantity) {
        throw new Error("Cannot sell more than current position");
      }

      const realized = (price - position.avgPrice) * quantity;

      position.realizedPnL += realized;
      position.quantity -= quantity;

      if (position.quantity === 0) {
        position.avgPrice = 0;
      }
    }
  }

  getPortfolio() {
    return this.positions;
  }

  getPnL(latestPrices) {
    let totalRealized = 0;
    let totalUnrealized = 0;

    for (const symbol in this.positions) {
      const position = this.positions[symbol];

      totalRealized += position.realizedPnL;

      const marketPrice = latestPrices[symbol];

      if (
        marketPrice != null &&
        position.quantity > 0
      ) {
        totalUnrealized +=
          (marketPrice - position.avgPrice) *
          position.quantity;
      }
    }

    return {
      realizedPnL: totalRealized,
      unrealizedPnL: totalUnrealized
    };
  }
}

module.exports = PortfolioEngine;
