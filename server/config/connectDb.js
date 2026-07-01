import mongoose from "mongoose";


const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("db connected successfully"))
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export default connectDb;