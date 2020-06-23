const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    MSSV: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true
    }
    // createdTime: {
    //     type: String,
    //     required: true
    // }
});

const User = module.exports = mongoose.model('User', userSchema)