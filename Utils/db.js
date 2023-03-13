const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const URL = process.env.URL;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(URL) 
        console.log('MongoDB is connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB;
