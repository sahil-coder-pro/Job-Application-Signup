import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        return await mongoose.connect(`${process.env.DATABASE_URI}${process.env.DATABASE_NAME}`)
    
    } catch (error) {
        throw err ;
    }
}