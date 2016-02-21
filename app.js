var express = require('express');
var swig = require('swig');
var app = express();
var path = require('path');
var morgan = require('morgan');
var http = require('http');

require('./filters')(swig);

var bodyParser = require('body-parser');

var model = require('./models');

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true }));

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


// to our wiki routes
app.use('/wiki', require('./routes/wiki'));

app.listen(3000,function() {
  console.log('server running on 3000');
});