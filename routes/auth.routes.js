const express = require("express");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User.model");

const router = express.Router();

const saltRounds = 10;

//GET /signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//POST /signup
router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  // make sure users fill all mandatory fields:
  if (!email || !password) {
    res.render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your email and password.",
    });
    return; // finish execution of the current function
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => {
      return bcryptjs.hash(password, salt);
    })
    .then((hash) => {
      const newUser = {
        email: email,
        passwordHash: hash,
      };

      return User.create(newUser);
    })
    .then((userFromDB) => {
      res.redirect("/user-profile");
    })
    .catch((error) => {
      console.log("error creating account...", error);

      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render("auth/signup", { errorMessage: error.message });
      } else {
        next(error);
      }
    });
});

//GET user-profile
router.get("/user-profile", (req, res) =>
  res.send("this is your user profile")
);

module.exports = router;
