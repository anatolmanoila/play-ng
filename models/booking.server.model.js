var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    created_on: Date
});
BookingSchema.virtual('id').get(function() {
    'use strict';
    return this._id;
});
var Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;