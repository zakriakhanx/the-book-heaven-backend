import mongoose from "mongoose";
import { getAuth } from "@clerk/express";
import { getClerkIdentity } from "../middleware/auth.middleware.js";
import Book from "../models/Book.js";

export const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const regex = new RegExp(q.trim(), "i");
    const filter = {
      $or: [
        { title: regex },
        { author: regex },
        { genre: regex },
        { description: regex },
      ],
    };

    const [books, totalItems] = await Promise.all([
      Book.find(filter).skip(skip).limit(limit),
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
    res.status(500).json({ message: "Error searching books", error });
  }
}