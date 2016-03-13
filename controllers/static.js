var express = require('express');
var router = require('express').Router();

router.use(express.static(__dirname + '/../public'));
router.get('/', function(req, res) {
    res.render('index.html.ejs');
});