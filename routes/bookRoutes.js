import { Router } from "express";
import Book from "../models/Book.js";
import Review from "../models/Review.js";
import Profile from "../models/profile.model.js";
import {
  requireAuth,
  requireAdmin,
  getClerkIdentity,
} from "../middleware/auth.middleware.js";
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
router.post("/books", requireAuth, async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const { userId, userName } = await getClerkIdentity(req);

    console.log(`from /books ${userId} ${userName}`)

    const newBook = new Book({
      title,
      author,
      genre,
      description,
      userId,
      userName,
    });
    await newBook.save();

    const profile = await Profile.findOne({ userId });

    if (profile) {
      await Profile.updateOne({ userId }, { $push: { recommendedBooks: newBook._id } });
    } else {
      const newProfile = new Profile({
        userId,
        username: userName,
        recommendedBooks: [newBook._id],
      });
      await newProfile.save();
    }

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res
      .status(500)
      .json({ message: "Error adding book", error: error.message });
  }
});

// Update details of an existing book
router.put("/books/:id", requireAuth, async (req, res) => {
  try {
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
router.delete("/books/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = await getClerkIdentity(req);

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId !== userId && role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: You can only delete your own books." });
    }

    await Review.deleteMany({ bookId: id }); // Deleting all Reviews of this book
    const deletedBook = await Book.findByIdAndDelete(id);

    await Profile.updateOne({ userId: book.userId }, { $pull: { recommendedBooks: id } });

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

export default router;
