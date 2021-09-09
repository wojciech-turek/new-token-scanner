const ETHToken = require("../models/token");
const HttpError = require("../models/http-error");

const { tokens } = require("../watcher/bep20-watcher");

const getTokens = async (req, res, next) => {
  res.json({ tokens });
};

const getTokenByContract = async (req, res, next) => {
  const contract = req.params.contract;
  let token;
  try {
    token = await ETHToken.find({ contr: contract });
  } catch (err) {
    throw new Error(err);
  }
  if (!token) {
    throw new HttpError("Could not find a token with provided contract.", 404);
  }
  res.json({ token });
};

const getPriceUpdate = async (req, res, next) => {
  res.json({ tokens });
};

const postTokenVoteUpdate = (req, res, next) => {
  const contract = req.body.contr;
  const vote = req.body.vote;
  tokens.map((token) => {
    if (token.contr === contract && vote === "up") {
      token.safety.votesUp++;
      res.send({
        res: {
          message: "votedUp",
          votesUp: token.safety.votesUp,
          votesDown: token.safety.votesDown,
        },
      });
    }
    if (token.contr === contract && vote === "down") {
      token.safety.votesDown++;
      res.send({
        res: {
          message: "votedDown",
          votesUp: token.safety.votesUp,
          votesDown: token.safety.votesDown,
        },
      });
    }
  });
};

exports.getTokens = getTokens;
exports.getTokenByContract = getTokenByContract;
exports.getPriceUpdate = getPriceUpdate;
exports.postTokenVoteUpdate = postTokenVoteUpdate;
