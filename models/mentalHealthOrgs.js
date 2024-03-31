const mongoose = require('mongoose');
const { isEmail} = require('validator');

const orgProviders = mongoose.Schema(
    {
        "Name" : {
            type : String,
            required : true
        },
        "Location" : {
            type: String,
            required: true
        },
        "Speciality" : {
            type : String,
            required : true
        },
        "Fee" : {
            type : String,
            required : true
        },
        "email": {
            type: String,
            required: false,
            validator: [isEmail, 'Please enter a valid email'],
            unique: true
        },
        "web" : {
            type: String,
            required: false
        },
        "phone1": {
            type: String,
            required: false
        },
        "phone2": {
            type: String,
            required: false
        },
        "Hotline": {
            type: String,
            required: false
        },
        "WhatsApp": {
            type: String,
            required: false
        },
        "Book": {
            type : String,
            required: false
        },
        "image" : {
            type : String,
            required : false
        },

    },
    {
        timestamps: true
    }
);

const orgModel = mongoose.model('organisation', orgProviders);

module.exports = orgModel;
