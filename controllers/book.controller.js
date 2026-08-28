import mongoose from "mongoose";
import Book from "../models/Book.js";
import Review from "../models/Review.js";
import Profile from "../models/profile.model.js";
import { getClerkIdentity } from "../middleware/auth.middleware.js";

// Retrieve a list of all books (paginated)
export const getAllBooks = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, parseInt(req.query.limit) || 10),
        );
        const skip = (page - 1) * limit;

        const filter = { status: "allowed" };

        const [books, totalItems] = await Promise.all([
            Book.find(filter).sort({ _id: -1 }).skip(skip).limit(limit),
            Book.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            data: books,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

// Retrieve a single book by id
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book id" });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
    }
};

// Add a new book to the database
export const addBook = async (req, res) => {
    try {
        const { title, author, genre, description } = req.body;
        const { userId, userName, role } = await getClerkIdentity(req);

        console.log(`from /books ${userId} ${userName}`);

        const newBook = new Book({
            title,
            author,
            genre,
            description,
            userId,
            userName,
            status: role === "admin" ? "allowed" : "pending",
        });
        await newBook.save();

        const profile = await Profile.findOne({ userId });

        if (profile) {
            await Profile.updateOne(
                { userId },
                { $push: { recommendedBooks: newBook._id } },
            );
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
        res.status(500).json({
            message: "Error adding book",
            error: error.message,
        });
    }
};

// Update details of an existing book
export const updateBook = async (req, res) => {
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
};

// Remove a book from the database
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, role } = await getClerkIdentity(req);

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.userId !== userId && role !== "admin") {
            return res.status(403).json({
                error: "Forbidden: You can only delete your own books.",
            });
        }

        await Review.deleteMany({ bookId: id }); // Deleting all Reviews of this book
        const deletedBook = await Book.findByIdAndDelete(id);

        await Profile.updateOne(
            { userId: book.userId },
            { $pull: { recommendedBooks: id, favoriteBooks: id } },
        );

        res.status(200).json({
            message: "Book deleted successfully",
            deletedBook,
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
};
