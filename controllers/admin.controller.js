import mongoose from "mongoose";
import Book from "../models/Book.js";

export const showPendingBooks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const allowedStatuses = ["pending", "allowed", "denied"];
    const status = allowedStatuses.includes(req.query.status)
      ? req.query.status
      : "pending";

    const filter = { status };

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
    res.status(500).json({ message: "Error fetching pending books", error });
  }
};

export const approveBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findByIdAndUpdate(
      bookId,
      { status: "allowed" },
      { new: true },
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book approved successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error approving book", error });
  }
};

export const denyBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const book = await Book.findByIdAndUpdate(
      bookId,
      { status: "denied" },
      { new: true },
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book denied successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error denying book", error });
  }
};
