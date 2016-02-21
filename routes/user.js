var express = require('express');
var router  = express.Router();
var models  = require('../models/');
var Page    = models.Page;
var User    = models.User;
var Promise = require('bluebird');


// get all users
router.get('/',function(req,res,next) {
  User.find().then(function(users) {
    res.render('users', {users: users});
  }).catch(next);
});
// get specific user
router.get('/:id',function(req,res,next) {
  var userPromise = User.findById(req.params.id).exec();
  var pagesPromise = Page.find({ author: req.params.id }).exec();
  Promise.join(userPromise, pagesPromise, function(user, pages){
    res.render('user', { user: user, pages: pages });
  }).catch(next);
});
// create a user in the db
router.post('/',function(req,res,next) {
  
});
// update user by id in the db
router.put('/:id',function(req,res,next) {

});
// delete user id in the db
router.delete('/:id',function(req,res,next) {

});

module.exports = router;