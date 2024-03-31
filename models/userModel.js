const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        //second arguement is a custom error message
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase : true,
        validate : [isEmail, 'Please enter a valid email']
    },
    password: {
        type : String,
        required : [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'] //mongoose validation
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    microsoftId: {
        type: String
    }
});

//mongoose hook for hashing user passwords before being sent to the database.
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method for comparing password with stored hash
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
