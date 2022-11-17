import mongoose from "mongoose";

const connectDB = async () => {
    const MONGO_URL ="mongodb+srv://user:1234@cluster0.vtojfrf.mongodb.net/?retryWrites=true&w=majority"
    if (mongoose.connections[0].readyState) {
        //console.log("Already connected.");
        return;
    }

    mongoose.connect(MONGO_URL, {}, (err) => {
        if (err) throw err;
        console.log("Connected to mongodb.");
    });

  
};

export default connectDB;