var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var statuses = ['open','closed'];

// create new schema
var pageSchema = new Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  date:     {type: Date, default: Date.now},
  status:   {type: String, enum: statuses},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tags:     {type: Array}
});

var userSchema = new Schema({
  name:  {type: String, required: true},
  email: {type: String, required: true, unique: true}
});


pageSchema.virtual('route').get(function() {
  return '/wiki/' + this.urlTitle;
});


var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

function generateUrlTitle(title) {
  // regex title -> makesure it is urlfriendly
  // non-alphanumeric characters
  // swap out spaces for underscores ' ' -> '_'
  console.log(title);
  if (title) {
    return title.replace(/[^a-zA-Z\d\s:]/g, '').replace(/\s/g, '_');
  } else {
    return Math.random().toString(36).substring(2,7);
  } 
  
}

pageSchema.pre('validate',function(next) {
  this.urlTitle = generateUrlTitle(this.title);
  // console.log('save pre hook: this is the data: ', this);
  next();
});
module.exports = {
  User: User,
  Page: Page
}

