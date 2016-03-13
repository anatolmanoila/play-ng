var router = require('express').Router();
var Meeting = require('../../models/meeting.server.model');

router.get('/meetings', function(req, res, next) {
    Meeting.find()
            .sort('start_date')
            .exec(function(err, meetingsFromDB) {
                res.json(meetingsFromDB);
            });
});


router.post('/meetings', function(req, res, next) {
    var meeting = new Meeting({
        text: req.body.text,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    });
    meeting.save(function(err, meeting) {
        if (err) { return next(err); }
        res.sendStatus(201).json(meeting);
    });
});

module.exports = router;
