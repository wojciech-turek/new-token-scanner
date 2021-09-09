const mongoose = require("mongoose");

// class Token extends Object {
//   constructor(
//     contr,
//     date,
//     tokenname,
//     tokensymbol,
//     price,
//     priceChange,
//     supply,
//     fdmc,
//     holders,
//     safety
//   ) {
//     super();
//     this.contr = contr;
//     this.date = date;
//     this.tokenname = tokenname;
//     this.tokensymbol = tokensymbol;
//     this.price = price;
//     this.priceChange = priceChange;
//     this.supply = supply;
//     this.fdmc = fdmc;
//     this.holders = holders;
//     this.safety = safety;
//   }
// }

// module.exports = Token;

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  contr: { type: String, required: true },
  date: { type: Date, required: true },
  tokenname: { type: String, default: "" },
  tokensymbol: { type: String, default: "" },
  price: { type: Number, default: "" },
  pricechange: { type: String, default: "" },
  supply: { type: Number, default: "" },
  fdmc: { type: Number, default: "" },
  holders: { type: Number, default: "" },
  safety: { type: Number, default: "" },
});

module.exports = mongoose.model("ETHToken", tokenSchema);
