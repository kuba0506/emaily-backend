const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./recipient.model');

// define model
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // add relationship
    dateSent: Date,
    lastVoted: Date
});

// create the model class
mongoose.model('surveys', surveySchema);