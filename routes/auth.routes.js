const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//GET SIGNUP
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//POST SIGNUP
router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      const newUser = {
        email: email,
        passwordHash: hash,
      };
      User.create(newUser);
    })
    .then((userFromDB) => {
      res.redirect("/user-profile");
    })
    .catch((error) => {
      console.log("error creating account...", error);
      next(error);
    });
});

//GET user-profile
router.get("/user-profile", (req, res, next) => {
  res.send("this is user profile");
});

module.exports = router;
