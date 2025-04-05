import mongoose from "mongoose";
import Favorite from "../models/favorite.model.js";

export const getFavorites = async (req, res) =>{
    try {
        const { id } = req.params;
        const fav = await Favorite.find({ userId: id });
        res.status(200).json(fav);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites', error });
    }
}

export const addFavorite = async (req, res) => {
    try {
        const newFavorite = new Favorite(req.body);
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error });
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const { id, bookId } = req.params;
        const fav = await Favorite.findByIdAndDelete({ userId: id, bookId: bookId});
        if (!fav) {
            return res.status(404).json({ message: 'Favorite Deleted' });
        }
        res.status(200).json({ message: 'Favorite deleted successfully', fav });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Favorite', error });
    }
}