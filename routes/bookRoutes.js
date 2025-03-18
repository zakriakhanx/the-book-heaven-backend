import { Router } from 'express';
import Book from '../models/Book.js';
import Review from '../models/Review.js';
import { authorize, authorizeRole } from '../middleware/auth.middleware.js';
const router = Router();

// Middleware
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};
router.use(timeLog);

// Retrieve a list of all books
router.get('/books', authorize, async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Add a new book to the database
router.post('/books', authorize, async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const newBook = new Book({ title, author, genre, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
});

// Update details of an existing book
router.put('/books/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Return the updated document
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});

// Remove a book from the database
router.delete('/books/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    await Review.deleteMany({ bookId: id }) // Deleting all Reviews of this book
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book Deleted' });
    }
    res.status(200).json({ message: 'Book deleted successfully', deletedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
});

export default router;
