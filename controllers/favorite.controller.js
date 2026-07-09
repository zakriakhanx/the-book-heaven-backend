import mongoose from "mongoose";
import Favorite from "../models/favorite.model.js";
import { getAuth } from "@clerk/express";

export const getFavorites = async (req, res) =>{
    try {
        const { userId } = getAuth(req);
        const fav = await Favorite.find({ userId });
        res.status(200).json(fav);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching favorites', error });
    }
}

export const addFavorite = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { bookId } = req.body;

        const newFavorite = new Favorite({ userId, bookId });
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error });
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { bookId } = req.params;

        const favFind = await Favorite.findOne({ userId, bookId });
        if (!favFind) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        const fav = await Favorite.findByIdAndDelete(favFind._id);
        if (!fav) {
            return res.status(404).json({ message: 'Favorite Deleted' });
        }

        res.status(200).json({ message: 'Favorite deleted successfully', fav });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Favorite', error });
    }
}