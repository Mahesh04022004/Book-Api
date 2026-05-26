const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middlewre");
const adminMiddleware = require("../middleware/admin-middleware");
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controller/book-controller");

router.get("/get", authMiddleware, getAllBooks);
router.get("/get/:id", authMiddleware, getBookById);
router.post("/add", authMiddleware, adminMiddleware, addNewBook);
router.put("/update/:id", authMiddleware, adminMiddleware, updateBook);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBook);

module.exports = router;
