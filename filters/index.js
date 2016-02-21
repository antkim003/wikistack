module.exports = function(swig) {

  
  var pageLink = function (page) {
    return '<a href="' + page.route + '">' + page.title + '</a>';
  };

  pageLink.safe = true;


  // var tagLink = function(tag) {
  //   return '<a href="' + '/wiki/search' + '">' + page.title + '</a>';
  // }

  swig.setFilter('pageLink', pageLink);
};