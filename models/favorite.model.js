import mongoose, { mongo } from "mongoose";

const favoriteSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }
})

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;