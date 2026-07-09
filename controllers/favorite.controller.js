import mongoose from "mongoose";
import Favorite from "../models/favorite.model.js";
import { getAuth } from "@clerk/express";

export const getFavorites = async (req, res) =>{
    try {
        const { userId } = getAuth(req);
        const fav = await Favorite.findOne({ userId }).populate('books');
        res.status(200).json(fav ? fav.books : []);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites', error });
    }
}

export const addFavorite = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { bookId } = req.body;

        let fav = await Favorite.findOne({ userId });
        if (!fav) {
            fav = new Favorite({ userId, books: [bookId] });
        } else if (!fav.books.some(id => id.toString() === bookId)) {
            fav.books.push(bookId);
        }

        await fav.save();
        res.status(201).json(fav);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error });
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { bookId } = req.params;

        const fav = await Favorite.findOne({ userId });
        if (!fav) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        fav.books = fav.books.filter(id => id.toString() !== bookId);
        await fav.save();

        res.status(200).json({ message: 'Favorite deleted successfully', fav });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Favorite', error });
    }
}