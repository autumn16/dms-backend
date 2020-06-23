const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // createdTime: {
    //     type: String,
    //     required: true
    // }
    
});

const Admin = module.exports = mongoose.model('Admin', adminSchema)