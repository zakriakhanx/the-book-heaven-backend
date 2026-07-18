import mongoose from "mongoose";
import Profile from "../models/profile.model.js";
import { getAuth } from "@clerk/express";
import { getClerkIdentity } from "../middleware/auth.middleware.js";

export const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { isAuthenticated } = getAuth(req);
    console.log("authenticate", isAuthenticated)
    console.log("username",username)

    let isOwner = false;
    if (isAuthenticated) {
      const { userName } = await getClerkIdentity(req);
      isOwner = userName === username;
    }

    console.log("iswoner",isOwner)

    const recommendedMatch = isOwner ? {} : { status: "allowed" };

    const query = Profile.findOne({ username }).populate({
      path: "recommendedBooks",
      match: recommendedMatch,
    });

    if (isOwner) {
      query.populate({
        path: "favoriteBooks",
        match: { status: "allowed" },
      });
    }

    const profile = await query;

      console.log("profile", profile)
    if (!profile) {
      if (isOwner) {
        return res.status(200).json({
          username,
          recommendedBooks: [],
          favoriteBooks: [],
        });
      }
      return res.status(404).json({ message: "Profile not found" });
    }

    const recommendedBooks = (profile.recommendedBooks || []).filter(Boolean);

    if (isOwner) {
      return res.status(200).json({
        username: profile.username,
        recommendedBooks,
        favoriteBooks: (profile.favoriteBooks || []).filter(Boolean),
      });
    }

    return res.status(200).json({
      username: profile.username,
      recommendedBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const profile = await Profile.findOne({ userId }).populate("favoriteBooks");

    res
      .status(200)
      .json(profile ? (profile.favoriteBooks || []).filter(Boolean) : []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { userId, userName } = await getClerkIdentity(req);
    const { bookId } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        $addToSet: { favoriteBooks: bookId },
        $setOnInsert: { userId, username: userName },
      },
      { new: true, upsert: true },
    ).populate("favoriteBooks");

    res.status(201).json((profile.favoriteBooks || []).filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { bookId } = req.params;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $pull: { favoriteBooks: bookId } },
      { new: true },
    ).populate("favoriteBooks");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res
      .status(200)
      .json({ message: "Favorite deleted successfully", favoriteBooks: profile.favoriteBooks });
  } catch (error) {
    res.status(500).json({ message: "Error deleting favorite", error });
  }
};
