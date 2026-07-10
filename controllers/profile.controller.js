import Profile from "../models/profile.model.js";

export const getProfileByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const profile = await Profile.findOne({ username }).populate('books');

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ username: profile.username, books: profile.books });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};
