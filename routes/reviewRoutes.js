import { Router } from 'express';
import Review from '../models/Review.js';
import Book from '../models/Book.js';
import mongoose from "mongoose";
const router = Router();

// Middleware
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};
router.use(timeLog);

// Get all reviews for a specific book
router.get('/books/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ bookId: id });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

// Create a new review for a book
router.post('/books/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { reviewerName, rating, comment } = req.body;
    const newReview = new Review({
      bookId: id,
      reviewerName,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', newReview});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

// Update a review
router.put('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review updated successfully', updatedReview});
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully', deletedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
});

export default router;