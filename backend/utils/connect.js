const mongoose = require('mongoose');
const connect = async () => {
 try {
    const connect = await mongoose.connect("mongodb+srv://aadityamalani15:yZQe3JmcNFo4Kvkw@cluster0.ynq1e9c.mongodb.net/");
    console.log(`MongoDB connected: ${connect.connection.host}`);
 } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
 }
};
module.exports = connect;
