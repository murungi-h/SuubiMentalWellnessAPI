const mongoose = require('mongoose');

const psychologists = mongoose.Schema(
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
        "Contact information" : {
            type : String,
            required : true
        },
        "image" : {
            type : String,
            required : false
        }
    },
    {
        timestamps: true
    }
);

const psychoModel = mongoose.model('Psychologist', psychologists);

module.exports = psychoModel;
