import mongoose from "mongoose";


const user = new mongoose.Schema(
    {
        userName: {
            type: String,
            require:true,
            unique: true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
            
        },
        password: {
            type: String,
            require: true,
        },

        role: {
            type: String,
            default:"user",
            enum: ['user', 'admin'],
        },

    },
    { timestamps: true }
)

const User = mongoose.model('User', user);
export default User;