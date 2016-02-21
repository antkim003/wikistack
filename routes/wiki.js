var express = require('express');
var router  = express.Router();
var models  = require('../models/');
var Page    = models.Page;
var User    = models.User;

router.get('/', function(req,res,next){
  // retrieve all wiki pages
  var allPages; 
  Page.find().then(function(pages) {
    console.log(pages);
    res.render('index',{pages: pages});  
  });
  
});

// search page
router.get('/search', function(req,res,next) {
  var tag = req.query.searchTag;

  if (tag) {
    // search by the query in the database for the tags
    // and return json
    console.log('there was a query', tag);
    res.send('tag query submitted');
  } else {
    // render the form here
    res.render('search'); 
  }

  // res.render('search');
});

// submit a new page to the database
router.post('/',function(req,res,next){
  
  console.log(req.body);
  // res.send('home post');
  var title   = req.body.title;
  var name    = req.body.name;
  var content = req.body.content;
  var status  = req.body.status;
  var tags    = req.body.tags;

  tags = tags.split(' ');

  // create the page model
  var page = new Page({
    title: title,
    content: content,
    tags: tags
  });


  page.save().then(function(data){
    console.log('successful db save: ', data);
    res.redirect(data.route);
  }).catch(function(err) {
    console.log('there was an error: ', err);
  }).then(null, next);
});

router.get('/add',function(req,res,next){
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({ urlTitle: req.params.urlTitle}).then(function(foundPage) {
    // convert tags to a string
    var tags = foundPage.tags.join(' ');
    res.render('wikipage',{page: foundPage, tags: tags});
  }).catch(next);
});




// get all users
router.get('/users/',function(req,res,next) {
  res.redirect('/wiki/');
});
// get specific user
router.get('/users/:id',function(req,res,next) {

});
// create a user in the db
router.post('/users/',function(req,res,next) {

});
// update user by id in the db
router.put('/users/:id',function(req,res,next) {

});
// delete user id in the db
router.delete('/users/:id',function(req,res,next) {

});

module.exports = router;
