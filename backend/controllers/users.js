const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.status(500);
    return next(new HttpError("Invalid input, please check your data.", 422));
  }
  const { name, email, password, favorites } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User existis already, use login instead.",
      422
    );
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    password,
    favorites,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed", 500);
    return next(error);
  }
  res.status(201).json({ createdUser: createdUser.toObject() });
};

const login = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials", 401);
    return next(error);
  }
  res.json({ message: "Logged in" });
};

exports.signup = signup;
exports.login = login;
