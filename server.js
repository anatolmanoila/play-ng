var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
var port = 3000;

var Meeting = require('./app/models/meeting.server.model');

app.get('/api/meetings', function(req, res) {

    Meeting.find(function(err, meetings) {
        if(err) {return next(err);}
        res.json(meetings);
    });
});

app.post('/api/meetings', function(req, res, next) {
    var meeting = new Meeting({
        "text": req.body.text,
        "start_date": req.body.start_date,
        "end_date": req.body.end_date,
    });

    meeting.save(function(err, post) {
        if (err) { return next(err);}
        res.json(201, meeting);
    });

});

app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});