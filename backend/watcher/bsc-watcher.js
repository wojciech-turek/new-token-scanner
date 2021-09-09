// const ethers = require("ethers");
// const BSCToken = require("../models/bsc-token");
// const fetch = require("node-fetch");

// const io = require("../socket");

// const addresses = {
//   WBNB: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
//   factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
//   router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
// };

// let provider = new ethers.providers.WebSocketProvider(
//   "wss://dawn-wispy-dawn.bsc.quiknode.pro/f03f6085d8550400f416a0bc7282efd047818082/"
// );

// const wallet = ethers.Wallet.createRandom();
// const account = wallet.connect(provider);

// const factory = new ethers.Contract(
//   addresses.factory,
//   [
//     "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
//   ],
//   account
// );

// factory.on("PairCreated", async (token0, token1, pairAddress) => {
//   console.log(`
//         New pair detected on BSC network watcher
//         =================
//         token0: ${token0}
//         token1: ${token1}
//         pairAddress: ${pairAddress}
//       `);
//   const excludedTokens = [
//     "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56".toLowerCase(),
//     "0x55d398326f99059fF775485246999027B3197955".toLowerCase(),
//     "0x2170Ed0880ac9A755fd29B2688956BD959F933F8".toLowerCase(),
//     "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82".toLowerCase(),
//     "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d".toLowerCase(),
//   ];

//   if (
//     token0.toLowerCase() !== addresses.WBNB.toLowerCase() &&
//     !excludedTokens.includes(token0.toLowerCase())
//   ) {
//     getAndStoreTokenData(token0);
//   } else if (!excludedTokens.includes(token1.toLowerCase())) {
//     getAndStoreTokenData(token1);
//   }
// });

// const clearBacklog = (contract) => {
//   getAndStoreTokenData(contract);
// };
// let tokens = [];

// const getAndStoreTokenData = async (contract) => {
//   console.log(contract);
//   await fetch("https://chartdata.poocoin.app/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // "X-API-KEY": "BQYUSRVBpJWVor3nls2izvsiHYCZ5RNB",
//     },
//     body: JSON.stringify({
//       query: `query getTokenInfo ($contract: String) {
//         ethereum(network: bsc) {
//           address(address: {is: $contract}) {
//             smartContract {
//               contractType
//               currency {
//                 name
//                 symbol
//               }
//             }
//           }
//         }
//       }
//     `,
//       variables: {
//         contract: contract,
//       },
//     }),
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((result) => {
//       return result.data.ethereum.address[0].smartContract;
//     })
//     .then(async (data) => {
//       console.log(data);
//       if (data !== null) {
//         await fetch(
//           `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${contract}&page=1&offset=10000&apikey=7MHS8HR4I5MZPWEDHX163DWZTKT4Q22ZFP`
//         )
//           .then((res1) => res1.json())
//           .then((holders) => {
//             const newToken = new BSCToken({
//               contr: contract,
//               tokenname: data.currency.name,
//               tokensymbol: data.currency.symbol,
//               holders: holders.result.length,
//               buy: `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${contract}`,
//               date: new Date(),
//             });
//             if (tokens.length >= 20) {
//               tokens.pop();
//               tokens.unshift(newToken);
//             } else {
//               tokens.unshift(newToken);
//             }
//             io.getIO().emit("token", { action: "create", token: newToken });
//           });
//       } else {
//         setTimeout(() => clearBacklog(contract), 300000);
//         console.log("Token added to 5 minutes backlog " + contract);
//       }
//     });
// };

// exports.tokens = tokens;
