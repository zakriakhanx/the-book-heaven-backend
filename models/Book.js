import mongoose from "mongoose";

// Books Schema
const bookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["allowed", "pending", "denied"],
    default: "pending",
    // required: true,
  }
});

const Book = mongoose.model('Book', bookSchema);

export default Book
