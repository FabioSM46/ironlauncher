const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");


router.get("/authors", (req, res, next) => {
    Author.find()
      .then((authorsFromDB) => {
        res.render("authors/authors-list", { authors: authorsFromDB });
      })
      .catch((err) => {
        next(err);
      });
  });
  
  module.exports = router;