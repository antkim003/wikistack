module.exports = function(swig) {

  
  var pageLink = function (page) {
    return '<a href="' + page.route + '">' + page.title + '</a>';
  };

  pageLink.safe = true;


  var tagLink = function(tag) {
    return '<a href="' + '/wiki/search?searchTag=' + tag + '">' + tag+ '</a>';
  }

  tagLink.safe = true;

  swig.setFilter('pageLink', pageLink);
  swig.setFilter('tagLink', tagLink);
};