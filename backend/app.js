const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

const tokenRoutes = require("./routes/token-routes");
const userRoutes = require("./routes/user-routes");
const { runBSCScan } = require("./watcher/bep20-watcher");
const updateTokenPrices = require("./prices/updateTokenPrices");
let { tokens } = require("./watcher/bep20-watcher");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

runBSCScan();
setInterval(async () => {
  const newTokens = await updateTokenPrices();
  newTokens.map((newToken) => {
    tokens.map((token) => {
      if (token.contr === newToken.contr) {
        token = newToken;
      }
    });
  });
}, 60000);

app.use("/api/tokens", tokenRoutes);
app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@tokentracker.o7wom.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    const server = app.listen(process.env.PORT || 5000);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("New connection!");
    });
  })
  .catch((err) => {
    throw err;
  });
