import mongoose from "mongoose";

const connectedDB=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/Native_Data');
        console.log('Database is connected');
    } catch (error) {
        console.log('Error to connect database ',error.message);
    }
}

export default connectedDB;