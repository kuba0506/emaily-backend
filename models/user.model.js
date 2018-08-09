const mongoose = require('mongoose');
const { Schema } = mongoose;

// define our model
const userSchema = new Schema({
    googleID: {
        type: String,
        unique: true
    },
    credits: {
        type: Number,
        default: 0
    }
});

// create the model class
mongoose.model('users', userSchema);