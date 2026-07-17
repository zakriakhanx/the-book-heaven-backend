import { Router } from "express";
import Review from "../models/Review.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";
import { requireAuth, getClerkIdentity } from "../middleware/auth.middleware.js";
const router = Router();

// Middleware
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

// Get all reviews for a specific book (paginated)
router.get("/books/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [reviews, totalItems] = await Promise.all([
      Review.find({ bookId: id }).sort({ _id: -1 }).skip(skip).limit(limit),
      Review.countDocuments({ bookId: id }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      data: reviews,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// Create a new review for a book
router.post("/books/:id/reviews", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { rating, comment } = req.body;
    const { userId, userName } = await getClerkIdentity(req);
    const newReview = new Review({
      bookId: id,
      userId,
      reviewerName: userName,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", newReview });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating review", error: error.message });
  }
});

// Update a review
router.put("/reviews/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res
      .status(200)
      .json({ message: "Review updated successfully", updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
});

// Delete a review
router.delete("/reviews/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = await getClerkIdentity(req);

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== userId && role !== "admin") {
      return res.status(403).json({ error: "Forbidden: You can only delete your own reviews." });
    }

    const deletedReview = await Review.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Review deleted successfully", deletedReview });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
});

export default router;
