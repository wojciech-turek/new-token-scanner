const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  contr: { type: String, required: true },
  pairAddress: { type: String, default: "" },
  decimals: { type: Number, default: 0 },
  date: { type: Date, required: true },
  tokenname: { type: String, default: "" },
  tokensymbol: { type: String, default: "" },
  price: { type: String, default: "" },
  initialPrice: { type: String, default: "" },
  highestPrice: { type: String, default: "" },
  pricechange: { type: String, default: "stale" },
  // holders: { type: Number, default: "" }, temp disabled
  holdersChange: { type: String, default: "stale" },
  buy: { type: String, default: "" },
  safety: {
    votesUp: { type: Number, default: 0 },
    votesDown: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("BSCToken", tokenSchema);
