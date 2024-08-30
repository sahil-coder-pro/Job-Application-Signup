import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    name: {
        type: String, 
        required: true, 
        trim: true,
    },
    state: {
        type: String, 
        required: true,
        trim: true
    },
    resume: {
        type: String, // cloudinary url
        required: true,
    },
    
}, 
{
    timestamps: true
})

export const User = mongoose.model("User", userSchema) ;