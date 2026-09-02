import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
    addBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook,
} from "../controllers/book.controller.js";
const router = Router();

// Retrieve a list of all books (paginated)
router.get("/books", getAllBooks);

// Retrieve a single book by id
router.get("/books/:id", getBookById);

// Add a new book to the database
router.post("/books", requireAuth, addBook);

// Update details of an existing book
router.put("/books/:id", requireAuth, updateBook);

// Remove a book from the database
router.delete("/books/:id", requireAuth, deleteBook);

export default router;
