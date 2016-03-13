var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();
var db = require('./db.config').connection;
var port = process.env.PORT || 3000;


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('secret'));
app.use (session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    }
));
app.use(express.static(path.join(__dirname, 'public')));

//routes
var api = require('./routes/api');
var index = require('./routes/index');
app.use('/api', api);
app.use('/', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});