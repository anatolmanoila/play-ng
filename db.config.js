var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/scheduler', function() {
    console.log('mongodb connected');
});

module.exports = mongoose;