const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        sucess: true,
        message: "List of Books fetched sucessfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found in database",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookDetailById = await Book.findById(bookId);

    if (!bookDetailById) {
      return res.status(404).json({
        success: false,
        message: `book with id ${bookId} not found try with differnet id`,
      });
    }

    res.status(200).json({
      success: true,
      message: `book with id ${bookId} found`,
      data: bookDetailById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBookFormData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedData = req.body;
    const bookId = req.params.id;
    const updateBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });
    if (!updateBook) {
      return res.status(404).json({
        success: false,
        message: `book update fail`,
      });
    }

    res.status(200).json({
      success: true,
      message: "book updated successfully",
      data: updateBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(bookId);
    if (!deleteBook) {
      return res.status(404).json({
        success: false,
        message: `book with id ${bookId} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong ! please try again",
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
