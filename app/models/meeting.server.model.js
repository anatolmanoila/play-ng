var db = require('../db');
var Meeting = db.model('Meeting', {
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
    }
});

module.exports = Meeting;