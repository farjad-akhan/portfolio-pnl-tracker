# Portfolio & PnL Tracker

A simple backend service to track trades, compute portfolio positions, and calculate Realized and Unrealized PnL.

This implementation uses the Average Cost method for cost basis calculation.

---

## Tech Stack

* Node.js
* Express
* Jest (Unit Testing)
* In-memory storage (no database)

---

## Assumptions

* Single user only
* All data stored in memory
* No authentication
* PnL calculated using Average Cost method
* Latest market prices are hardcoded inside `/pnl` endpoint

---

## API Endpoints

### 1. Add Trade

**POST** `/trades`

```json
{
  "symbol": "BTC",
  "side": "BUY",
  "price": 40000,
  "quantity": 1
}
```

---

### 2. Get Portfolio

**GET** `/portfolio`

Returns current holdings per symbol:

```json
{
  "BTC": {
    "quantity": 1,
    "avgPrice": 41000,
    "realizedPnL": 2000
  }
}
```

---

### 3. Get PnL

**GET** `/pnl`

Returns:

```json
{
  "realizedPnL": 2000,
  "unrealizedPnL": 3000
}
```

---

## PnL Methodology

This implementation uses the Average Cost Method:

* Average entry price is recalculated on each buy.
* Realized PnL is computed on sell using current average cost.
* Unrealized PnL = (Market Price − Avg Price) × Remaining Quantity.

---

## Running Tests

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

---

## Running the Service

Start the server:

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## Project Structure

```
src/
  app.js
  routes.js
  portfolioEngine.js

tests/
  portfolioEngine.test.js
```
