const ethers = require("ethers");
const { createToken } = require("../controllers/tokens");
const ETHToken = require("../models/token");

const addresses = {
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
};

const provider = new ethers.providers.WebSocketProvider(
  "wss://mainnet.infura.io/ws/v3/9c38c0f8900e4335a68282d4a29af940"
);

const wallet = ethers.Wallet.createRandom();
const account = wallet.connect(provider);

const factory = new ethers.Contract(
  addresses.factory,
  [
    "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
  ],
  account
);

factory.on("PairCreated", async (token0, token1, pairAddress) => {
  console.log(`
        New pair detected on ETH network watcher
        =================
        token0: ${token0}
        token1: ${token1}
        pairAddress: ${pairAddress}
      `);
  if (token0 !== addresses.WETH) {
    getAndStoreTokenData(token0);
  } else {
    getAndStoreTokenData(token1);
  }
});

const getAndStoreTokenData = (contract) => {
  // fetch additional token data from etherscan
  // fetch data from uniswap api
  console.log("Storing " + contract);
  const newToken = new ETHToken({
    contr: contract,
    date: new Date().toLocaleString(),
  });
  // createToken(newToken);
};

module.exports = factory;
