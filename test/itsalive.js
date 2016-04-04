var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
chai.use(spies);
var Page = require('../db').models.Page;

describe('simple test', function() {

  beforeEach(function() {
    
  });
  xit('it adds two numbers',function() {
    expect(2+2).to.eql(4);
  });
});

describe('Asynchronous', function() {

  
  xit("confirms setTimeout's timer accuracy",function(done) {
    var start = new Date();
    setTimeout(function() {
      var duration = new Date()-start;
      expect(duration).to.be.closeTo(1000,50);
      done();
    }, 1000);
  });
});

describe('beforeEach has been called', function() {
  function printResult (value, idx) {
    console.log('value', value, 'idx', idx);
  };
  var array = [1,2,3];
    
  beforeEach(function() {
    
  });
  xit('confirms that forEach will invoke its function once for every element', function() {
    
    printResult = chai.spy(printResult);
    array.forEach(printResult);
    expect(printResult).to.have.been.called.exactly(array.length);

  });

  xit('returns the larger of two numbers', function () {
    var larger = Math.max(5,6);
    Math.max = function (a, b) {
        if (a < b) return b;
        else return a;
    };
    expect(larger).to.equal(6);
  });
});




describe('Page Model', function(){ 
  var page
  beforeEach(function() {
      page = new Page();
  });
  describe('Validations', function() {
      
        
      xit('errors without title', function(done) {
        page.validate(function(err) {
          console.log(err);
          expect(err.errors).to.have.property('title')
          done();
        });
      });
      xit('errors without content', function(done) {
        page.validate(function(err) {
          console.log(err);
          expect(err.errors).to.have.property('content')
          done();
        });
      });
  });

  describe('Statics', function() {
      beforeEach(function() {
        Page.create({
            title: 'foo',
            content: 'bar',
            tags: ['foo', 'bar']
        }, done )
      });
      describe('findByTag', function() {
          xit('gets pages with the search tag', function(done) {
            
          });
          xit('does not get pages without the search tag', function() {});
      });
  });

  describe('Methods', function() {
      describe('findSimilar', function() {
          xit('never gets itself', function() {});
          xit('gets other pages with any common tags', function() {});
          xit('does not get other pages without any common tags', function() {});
      });
  });

  describe('Virtuals', function() {
      describe('route', function() {
          xit('returns the url_name prepended by "/wiki/"', function() {});
      });
  });

  describe('Hooks', function() {
      xit('it sets urlTitle based on title before validating', function() {});
  });
});