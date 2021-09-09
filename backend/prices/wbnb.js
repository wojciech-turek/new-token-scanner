const { ethers } = require("ethers");
const { Decimal } = require("decimal.js");

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);

const tokenAbi = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
];

const getWBNBUSDValue = async () => {
  const bnbusdtpair = "0x1B96B92314C44b159149f7E0303511fB2Fc4774f";
  const bnbusdtContract = new ethers.Contract(bnbusdtpair, tokenAbi, provider);
  const reserves = await bnbusdtContract.getReserves();
  const [reserve0, reserve1] = reserves;
  const divider = new Decimal(reserve0.toString());
  const dividee = new Decimal(reserve1.toString());
  const price = Decimal.div(dividee, divider);
  return Number(price.toFixed(2));
};
getWBNBUSDValue();

module.exports = getWBNBUSDValue;
