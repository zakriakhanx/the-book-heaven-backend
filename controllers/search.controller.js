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

    const regex = new RegExp(q.trim(), "i");

    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { genre: regex },
        { description: regex },
      ],
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error searching books", error });
  }
}