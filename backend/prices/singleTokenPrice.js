const { ethers } = require("ethers");
const { Decimal } = require("decimal.js");
const getWBNBUSDValue = require("./wbnb");

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);

const tokenAbi = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
];

const getTokenPrice = async (pairAddress, decimals, bnbUsdValue) => {
  const tokenPair = pairAddress;
  const pairContract = new ethers.Contract(tokenPair, tokenAbi, provider);
  const token0 = await pairContract.token0();
  const token1 = await pairContract.token1();
  let bnbPosition;

  if (!bnbUsdValue) {
    bnbUsdValue = await getWBNBUSDValue();
  }

  if (token0 === "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
    bnbPosition = 0;
  } else if (token1 === "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") {
    bnbPosition = 1;
  }
  const WBNBdecimals = 18;
  const tokenDecimals = decimals;
  const reserves = await pairContract.getReserves();
  if (!reserves) {
    return null;
  }
  const [reserve0, reserve1] = reserves;
  let dividerDecimaled;
  let divideeDecimaled;
  let result;
  if (bnbPosition === 0) {
    dividerDecimaled = Decimal.div(
      new Decimal(reserve0.toString()),
      Math.pow(10, WBNBdecimals)
    );
    divideeDecimaled = Decimal.div(
      new Decimal(reserve1.toString()),
      Math.pow(10, tokenDecimals)
    );

    result = Decimal.div(dividerDecimaled, divideeDecimaled);
  } else if (bnbPosition === 1) {
    dividerDecimaled = Decimal.div(
      new Decimal(reserve1.toString()),
      Math.pow(10, WBNBdecimals)
    );
    divideeDecimaled = Decimal.div(
      new Decimal(reserve0.toString()),
      Math.pow(10, tokenDecimals)
    );
    result = Decimal.div(dividerDecimaled, divideeDecimaled);
  } else {
    return "0";
  }
  const price = Decimal.mul(result.toNumber().toFixed(20), bnbUsdValue);
  let priceNumber = Number(price).toFixed(16).toString();
  priceNumber = !isNaN(priceNumber) ? priceNumber : "0";
  return priceNumber;
};

module.exports = getTokenPrice;
