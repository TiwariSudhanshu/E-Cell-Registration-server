import mongoose from "mongoose";


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected !! DB Host")
    } catch (error) {
        console.error("Error",error);
        process.exit();
    }
}

export default connectDB;