const ethers = require("ethers");
const fetch = require("node-fetch");
const getTokenPrice = require("../prices/singleTokenPrice");
const BSCToken = require("../models/bsc-token");
const io = require("../socket");

const excludedTokens = [
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56".toLowerCase(),
  "0x55d398326f99059fF775485246999027B3197955".toLowerCase(),
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8".toLowerCase(),
  "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82".toLowerCase(),
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d".toLowerCase(),
  "0xdD901faf9652D474b0A70263E13DA294990d49AE".toLowerCase(),
];

const bannedTokens = [
  "CZ",
  "✊💦ONLYFANS",
  "💋OnlyFans",
  "Raw Data",
  "✊💦ONLYFANS TOKEN",
  "🐶BABY DOGE",
];

let tokens = [];

const EXPECTED_PONG_BACK = 15000;
const KEEP_ALIVE_CHECK_INTERVAL = 75000;

let pingTimeout = null;
let keepAliveInterval = null;

const runBSCScan = () => {
  let BSCprovider = new ethers.providers.WebSocketProvider(
    process.env.BSC_SOCKET
  );
  BSCprovider.on("error", (error) => {
    throw new Error(error);
  });

  BSCprovider._websocket.on("open", () => {
    keepAliveInterval = setInterval(() => {
      console.log("Checking if the connection is alive, sending a ping");
      BSCprovider._websocket.ping();
      pingTimeout = setTimeout(() => {
        BSCprovider._websocket.terminate();
      }, EXPECTED_PONG_BACK);
    }, KEEP_ALIVE_CHECK_INTERVAL);
  });

  BSCprovider._websocket.on("close", () => {
    console.log("The websocket connection was closed");
    clearInterval(keepAliveInterval);
    clearTimeout(pingTimeout);
    runBSCScan();
  });
  BSCprovider._websocket.on("pong", () => {
    console.log("Received pong, so connection is alive, clearing the timeout");
    clearInterval(pingTimeout);
  });

  const addresses = {
    WBNB: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  };

  const standardAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() external pure returns (uint8)",
  ];

  const wallet = ethers.Wallet.createRandom();
  const account = wallet.connect(BSCprovider);

  const factory = new ethers.Contract(
    addresses.factory,
    [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ],
    account
  );
  factory.on("PairCreated", async (token0, token1, pairAddress) => {
    console.log(`
           New pair detected on BSC network watcher
           =================
           token0: ${token0}
           token1: ${token1}
           pairAddress: ${pairAddress}
        `);
    let newToken;
    let bnbToken;
    if (
      token0.toLowerCase() !== addresses.WBNB.toLowerCase() &&
      !excludedTokens.includes(token0.toLowerCase())
    ) {
      newToken = token0;
      bnbToken = token1;
    } else if (!excludedTokens.includes(token1.toLowerCase())) {
      newToken = token1;
      bnbToken = token0;
    }
    const standardContract = new ethers.Contract(
      newToken,
      standardAbi,
      BSCprovider
    );
    let name = await standardContract.name();
    console.log(name);
    let symbol = await standardContract.symbol();
    let decimals = await standardContract.decimals();

    //HOLDERS moved to PRO API implement in the future?

    // let holders = await fetch(
    //   `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${newToken}&page=1&offset=1000&apikey=7MHS8HR4I5MZPWEDHX163DWZTKT4Q22ZFP`
    // )
    //   .then((res) => res.json())
    //   .then((holdersData) => holdersData.result.length);
    // console.log(holders);
    let price = await getTokenPrice(pairAddress, decimals);
    const newBscToken = new BSCToken({
      contr: newToken,
      pairAddress: pairAddress,
      tokenname: name,
      tokensymbol: symbol,
      decimals: decimals,
      // holders: holders, disabled due to above
      buy: newToken,
      date: new Date(),
      price: price,
      initialPrice: price,
      highestPrice: price,
      safety: {
        votesUp: 0,
        votesDown: 0,
      },
    });
    if (
      price === "0" ||
      price === "0.0000000000000000" ||
      bannedTokens.includes(name)
    ) {
      return;
    }
    if (tokens.length >= 20) {
      tokens.pop();
      tokens.unshift(newBscToken);
    } else {
      tokens.unshift(newBscToken);
    }
    io.getIO().emit("token", { action: "create", token: newBscToken });
    return { token0, token1, pairAddress, name, symbol, decimals, price };
  });
};

exports.runBSCScan = runBSCScan;
exports.tokens = tokens;
