import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
