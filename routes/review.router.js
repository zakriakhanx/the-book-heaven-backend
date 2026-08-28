import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
    createReviewForBook,
    deleteReview,
    getReviewsForBook,
    updateReview,
} from "../controllers/review.controller.js";
const router = Router();

// Get all reviews for a specific book (paginated)
router.get("/books/:id/reviews", getReviewsForBook());

// Create a new review for a book
router.post("/books/:id/reviews", requireAuth, createReviewForBook());

// Update a review
router.put("/reviews/:id", requireAuth, updateReview());

// Delete a review
router.delete("/reviews/:id", requireAuth, deleteReview());

export default router;
