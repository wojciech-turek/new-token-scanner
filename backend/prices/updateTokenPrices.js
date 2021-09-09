const { tokens } = require("../watcher/bep20-watcher");
const getTokenPrice = require("./singleTokenPrice");
const getWBNBUSDValue = require("./wbnb");

async function updateTokenPrices() {
  console.log("prices updating...");
  const bnbUsdValue = await getWBNBUSDValue();
  let tokenPromises = tokens.map(async (token) => {
    const newPrice = await getTokenPrice(
      token.pairAddress,
      token.decimals,
      bnbUsdValue
    );
    let pricechange;
    if (token.highestPrice < newPrice) {
      token.highestPrice = newPrice;
    }
    if (token.price < newPrice) {
      pricechange = "incr";
    } else if (token.price > newPrice) {
      pricechange = "decr";
    } else if (token.price === newPrice) {
      pricechange = "stale";
    }
    if (!token.initialPrice || token.initialPrice === "0") {
      token.initialPrice = newPrice;
    }
    // const newHolders = await getHolders(token.contr);
    // if (token.holders < newHolders) {
    //   token.holdersChange = "incr";
    // } else if (token.holders > newHolders) {
    //   token.holdersChange = "decr";
    // } else if (token.holders === newHolders) {
    //   token.holdersChange = "stale";
    // }
    // token.holders = newHolders;
    token.price = newPrice;
    token.pricechange = pricechange;
    return token;
  });
  const updatedTokens = await Promise.all(tokenPromises);
  return updatedTokens;
}
module.exports = updateTokenPrices;
