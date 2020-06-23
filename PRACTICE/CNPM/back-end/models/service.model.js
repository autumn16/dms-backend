const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    createdTime: {
        type: String,
        required: true
    },
    updatedTime: {
        type: String
    }
});

const Service = module.exports = mongoose.model('Service', serviceSchema)