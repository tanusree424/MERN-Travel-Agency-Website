import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const MONGOURI = process.env.MONGO_URI 
const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGOURI);
        console.log(`Connected To Database Successfully on this connection: ${mongoose.connection.host} `)
    } catch (error) {
        console.log("Not Connected"+ error?.message)
    }
}

export default connectToDatabase