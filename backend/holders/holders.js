const fetch = require("node-fetch");

const getHolders = async (contract) => {
  const holders = await fetch(
    `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${contract}&page=1&offset=100&apikey=7MHS8HR4I5MZPWEDHX163DWZTKT4Q22ZFP`
  )
    .then((res) => res.json())
    .then((holdersData) => holdersData.result.length)
    .catch((error) => {
      throw new Error(error);
    });
  return holders;
};

module.exports = getHolders;
