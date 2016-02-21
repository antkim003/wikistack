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
    
    Page.find({
      tags: {$in: [tag]}
    }).then(function(data){
      
      if (data.length > 0) {
        console.log('heres what the data is',data);
        res.render('results', {results: data, searchQuery: tag});
      } else {
        res.send('zero results');
      }
    });

  } else {
    // render the form here
    res.render('search'); 
  }

});

router.get('/similar/:urlTitle', function(req,res,next) {
  // look for all that username
  // look for all similar tags
  // render page
  var tags;
  Page.findOne({
    urlTitle : req.params.urlTitle
  }).then(function(page) {
    tags = page.tags
    // console.log(tags);
    return Page.find({
      tags: {$in: tags},
      _id: {$ne: page._id}
    });
  }).then(function(results) {
    console.log('all the users with tag',results)
    res.render('results', {results: results, searchQuery: "similar to: " + req.params.urlTitle})
  });

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
  var email   = req.body.email;

  tags = tags.split(' ');

  // create the page model
  var page = new Page({
    title: title,
    content: content,
    tags: tags
  });

  User.findOrCreate(req.body).then(function(user) {
    console.log(user);
    page.author = user._id;
    return page.save();
  }).then(function(savedPage){
    console.log('successful db save: ', savedPage);
    res.redirect(savedPage.route);
  }).catch(function(err) {
    console.log('there was an error: ', err);
  }).then(null, next);
});

router.get('/add',function(req,res,next){
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
  var pageFound, userFound;
  Page.findOne({ urlTitle: req.params.urlTitle}).then(function(foundPage) {
    // convert tags to a string
    var pageFound = foundPage;
    return User.findOne({ _id: foundPage.author })
    
  }).then(function(foundUser) {
    res.render('wikipage',{page: pageFound, user: foundUser});
  }).catch(next);
});


module.exports = router;
