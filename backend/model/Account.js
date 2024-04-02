const mongoose = require('mongoose');

// Create a Schema for Accounts

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    balance:{
        type: Number,
        required: true
    }
})


const Account=mongoose.model('Account',accountSchema);
module.exports={
    Account
}