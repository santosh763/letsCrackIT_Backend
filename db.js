const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



const connetDB = async()=>{

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = connetDB