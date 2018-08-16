const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    voted: { type: Boolean, default: false } // in order to allow vote once
});

module.exports = recipientSchema;