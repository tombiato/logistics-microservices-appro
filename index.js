const express = require("express");

// GLOBAL
require("dotenv").config();
const port = process.env.PORT || 8000;

const connectDB = require("./config/db");

// Models
const SupplySummaryDto = require("./models/SupplySummaryDto");

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.post("/api/supply", (req, res) => {
  // TODO
});

app.get("/api/supply/summary", async (req, res) => {
  res.status(200).json(await SupplySummaryDto.find({}));
});

app.post("/api/supply-needed", (req, res) => {
  // TODO
});

app.post("/api/supply-request", (req, res) => {
  // TODO
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
