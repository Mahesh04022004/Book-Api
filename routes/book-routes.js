const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controller/book-controller");

router.get("/get", getAllBooks);
router.get("/get/:id", getBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
