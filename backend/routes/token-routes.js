const express = require("express");
const router = express.Router();

const tokensControllers = require("../controllers/tokens");

router.get("/", tokensControllers.getTokens);
router.get("/prices", tokensControllers.getPriceUpdate);
router.get("/:contract", tokensControllers.getTokenByContract);
router.post("/votes", tokensControllers.postTokenVoteUpdate);

module.exports = router;
