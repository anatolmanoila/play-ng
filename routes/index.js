'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Booking Scheduler' });
// });

router.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
