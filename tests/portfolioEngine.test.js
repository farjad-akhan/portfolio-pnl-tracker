const PortfolioEngine = require("../src/portfolioEngine");

describe("PortfolioEngine - Average Cost Method", () => {

  let engine;

  beforeEach(() => {
    engine = new PortfolioEngine();
  });

  test("should calculate average price correctly after multiple buys", () => {
    engine.addTrade({ symbol: "BTC", side: "BUY", price: 40000, quantity: 1 });
    engine.addTrade({ symbol: "BTC", side: "BUY", price: 42000, quantity: 1 });

    const portfolio = engine.getPortfolio();

    expect(portfolio.BTC.quantity).toBe(2);
    expect(portfolio.BTC.avgPrice).toBe(41000);
  });

  test("should calculate realized PnL correctly after sell", () => {
    engine.addTrade({ symbol: "BTC", side: "BUY", price: 40000, quantity: 1 });
    engine.addTrade({ symbol: "BTC", side: "BUY", price: 42000, quantity: 1 });
    engine.addTrade({ symbol: "BTC", side: "SELL", price: 43000, quantity: 1 });

    const pnl = engine.getPnL({ BTC: 44000 });

    expect(pnl.realizedPnL).toBe(2000);
  });

  test("should calculate unrealized PnL correctly", () => {
    engine.addTrade({ symbol: "BTC", side: "BUY", price: 40000, quantity: 1 });

    const pnl = engine.getPnL({ BTC: 45000 });

    expect(pnl.unrealizedPnL).toBe(5000);
  });

  test("should not allow selling more than holdings", () => {
    engine.addTrade({ symbol: "BTC", side: "BUY", price: 40000, quantity: 1 });

    expect(() => {
      engine.addTrade({ symbol: "BTC", side: "SELL", price: 42000, quantity: 2 });
    }).toThrow();
  });

});
