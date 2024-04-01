const mongoose = require('mongoose');
const connect = async () => {
 try {
    const connect = await mongoose.connect("mongodb+srv://aadityamalani15:6TqbUe9lJsJ8LHyr@cluster0.ft8jlt3.mongodb.net/");
    console.log(`MongoDB connected: ${connect.connection.host}`);
 } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
 }
};
module.exports = connect;
