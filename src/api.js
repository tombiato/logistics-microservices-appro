import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import connectDB from "../config/db";
import SupplyProductDto from "../models/SupplyProductDto";
import SupplySummaryDto from "../models/SupplySummaryDto";

// GLOBAL
dotenv.config();

const app = express();

connectDB();

// const router = express.Router();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.post("/api/supply", async (req, res) => {
  try {
    const [supplyId, products] = req.body.SupplyInputDto;

    for (const product of products) {
      targetUrl = `/api/stock/${product.ean}/movement`;
      const res = await axios.post(targetUrl, {
        productId: product.name, // This ID is the ID inside the catalogue
        quantity: product.quantity,
        status: "Supply",
      });
    }

    res.status(204);
  } catch (err) {}
});

app.get("/api/supply/summary", async (req, res) => {
  const supplies = await SupplyProductDto.find({});

  const summary = new SupplySummaryDto({ nbSupplies: supplies.length });
});

app.post("/api/supply-needed", (req, res) => {
  // TODO
});

app.post("/api/supply-request", (req, res) => {
  // TODO
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
