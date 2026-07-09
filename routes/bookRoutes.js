import { Router } from "express";
import Book from "../models/Book.js";
import Review from "../models/Review.js";
import { getAuth } from "@clerk/express";
import { requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

// Middleware
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

// Retrieve a list of all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Add a new book to the database
router.post("/books", async (req, res) => {
  try {
    const { isAuthenticated } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthenticated" });
      return;
    }

    const { title, author, genre, description, userName } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      description,
      userId: req.user._id,
      userName: req.user.userName,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});

// Update details of an existing book
router.put("/books/:id", async (req, res) => {
  try {
    const { isAuthenticated } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthenticated" });
      return;
    }

    const { id } = req.params;
    const updatedData = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }, // Return the updated document
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// Remove a book from the database
router.delete("/books/:id", async (req, res) => {
  try {
    const { isAuthenticated } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthenticated" });
      return;
    }
    
    const { id } = req.params;
    await Review.deleteMany({ bookId: id }); // Deleting all Reviews of this book
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book Deleted" });
    }
    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;
