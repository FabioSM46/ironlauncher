const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model");
/* GET /books */
router.get("/books", (req, res, next) => {
  let minimumRating = req.query.minRating;
  minimumRating = Number(minimumRating);
  let filter = {};

  if (minimumRating) {
    filter = { rating: { $gte: minimumRating } };
  }

  Book.find(filter)
    .then((booksFromDB) => {
      res.render("books/books-list", { books: booksFromDB });
    })
    .catch((err) => {
      console.log("Error getting the list of books from DB...", err);
      next(err);
    });
});

router.get("/book-details/:bookID", (req, res, next) => {
  Book.findById(req.params.bookID).then((booksByID) => {
    res.render("books/book-details", { bookID: booksByID });
  });
});

router.get("/books/create", (req, res, next) => {
  res.render("books/create-book");
});

router.post("/books/create", (req, res, next) => {
  const newBook = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating,
  };

  Book.create(newBook)
    .then((newBook) => {
      /*res.send
        res.sendfile
        res.render
        res.json */
      res.redirect("/books");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/book-details/:bookId/update", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((bookById) => {
      res.render("books/book-update", { bookID: bookById });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/book-details/:bookId/update", (req, res, next) => {
  const { bookId } = req.params;
  console.log(req.params.bookId);
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(
    bookId,
    { title, description, author, rating },
    { new: true }
  )
    .then((updatedBook) => {
      res.redirect(`/book-details/${updatedBook.id}/update`);
    })
    .catch((err) => next(err));
});

router.post("/book-details/:bookId/delete", (req, res, next) => {
  const { bookId } = req.params;
  Book.findByIdAndDelete(bookId)
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
