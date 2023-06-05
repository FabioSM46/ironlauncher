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

router.get('/books/create', (req,res,next)=>{
    res.render('books/create-book')
})

/* router.post('/books/book-created', (req,res,next)=>{
    res.render('books/book-created')
})
.then(()=>{
    res.send('book created')
})
.catch((err)=>{
    console.log('error ',err);
}) */









module.exports = router;
