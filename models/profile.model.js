import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    recommendedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    favoriteBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
