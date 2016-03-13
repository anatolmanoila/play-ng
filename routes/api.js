'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Booking = require('../models/booking.server.model');
var adminUser = require('../models/admin-users.server.model');

function sessionCheck(req,res,next){

    if(req.session.user) next();
        else res.status(401).send('authorization failed');
}
//users routes
router.get('/', function(req, res) {
    res.send('Welcome to Scheduler API zone');
});

router.get('/bookings', function(req, res) {

    return Booking.find(function(err, bookingsData) {
        if (!err) {
            return res.send(bookingsData);
        } else {
            return res.status(500).send(err);
        }
    });
});

router.post('/bookings/add', sessionCheck, function(req, res) {
    var booking = new Booking({
        text: req.body.text,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        created_on: new Date(Date.now())
    });

    booking.save(function(err) {
        if (!err) {
            return res.status(200).send(booking);
        } else {
            return  res.status(500).send(err);
        }
    });

});

router.post('/bookings/update', sessionCheck, function(req, res) {
    var id = req.body._id;

    Booking.update(
        {_id: id},
        {
            $set: {
                text: req.body.text,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                created_on: new Date(Date.now())
            }
        }).exec();
    res.send('Booking updated.');
});

router.get('/bookings/delete/:id', sessionCheck, function(req, res) {
    var id = req.params.id;

    Booking.remove({
        _id: id
    }, function(err) {
        return console.log(err);
    });

    return res.send('Page id- ' + id + 'has been deleted');
});

router.get('/bookings/admin-details/:id', sessionCheck, function(req, res) {
    var id = req.params.id;

    Booking.findOne({
        _id: id
    }, function(err, booking) {
        if (err) {
            return console.log(err);
        }
        return res.send(booking);
    });
});

router.get('/bookings/details/:url', function(req, res) {
    var url = req.params.url;
    Page.findOne({
        url: url
    }, function(err, page) {
        if (err)
            return console.log(err);
        return res.send(page);
    });
});

//admin-users routes
router.post('/add-user', function(req, res) {
    var salt, hash, password;

    password = req.body.password;
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);

    var AdminUser = new adminUser({
        username: req.body.username,
        password: hash
    });

    AdminUser.save(function(err) {
        if(!err) {
            return res.send('Admin User successfully created.');
        }
    });

});

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    adminUser.findOne({
        username: username
    }, function(err, data) {
        if(err | data === null) {
            return res.status(401).send("User Doesn't exist");
        } else {
            //we have user
            var usr = data;

            if (username == usr.username && bcrypt.compareSync(password, usr.password)) {
                req.session.regenerate(function() {
                    req.session.user = username;
                    return res.send(username);
                });
            } else {
                return res.status(401).send("Bad Username or Password");
            }
        }
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        return res.status(401).send('User logged out');
    });
});


module.exports = router;