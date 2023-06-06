const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

/* GET /books */
router.get("/books", (req, res, next) => {
  let minimumRating = req.query.minRating;
  minimumRating = Number(minimumRating);
  let filter = {};

  if (minimumRating) {
    filter = { rating: { $gte: minimumRating } };
  }

  Book.find(filter)
    .populate("author")
    .then((booksFromDB) => {
      res.render("books/books-list", { books: booksFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/book-details/:bookID", (req, res, next) => {
  Book.findById(req.params.bookID)
    .populate("author")
    .then((booksByID) => {
      res.render("books/book-details", { bookID: booksByID });
    });
});

router.get("/books/create", (req, res, next) => {
  Author.find()
    .then((authorsFromDB) => {
      res.render("books/book-create", { authorsArr: authorsFromDB });
    })
    .catch((err) => {
      next(err);
    });
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
      res.redirect("/books");
    })
    .catch((err) => {
      next(err);
    });
});

/* router.get("/book-details/:bookId/update", (req, res, next) => {
  const { bookId } = req.params;
  let authors;
  Author.find()
    .then((authorsFromDB) => {
      authors = authorsFromDB;
      return Book.findById(bookId);
    })
    .then((bookToUpdate) => {
      res.render("books/book-update", { book: bookToUpdate, authors: authors });
    })
    .catch((err) => {
      next(err);
    });
}); */
///
router.get("/book-details/:bookId/update", async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const authors = await Author.find();
    const bookDetails = await Book.findById(bookId);

    res.render("books/book-update", { book: bookDetails, authors: authors });
  } catch (err) {
    next(err);
  }
});
///
router.post("/book-details/:bookId/update", (req, res, next) => {
  const { bookId } = req.params;
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(
    bookId,
    { title, description, author, rating },
    { new: true }
  )
    .populate("author")
    .then((updatedBook) => {
      //res.redirect(`/book-details/${updatedBook.id}/update`);
      res.redirect("/books");
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
