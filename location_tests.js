Tinytest.add("Location - basic functionality", function(test) {
  var path;
  
  Meteor.autorun(function() {
    path = Meteor.Location.path();
  });
  
  Meteor.Location.setPath('/');
  Meteor.flush();
  test.equal(path, '/');
    
  Meteor.Location.setPath('/foo');
  Meteor.flush();
  test.equal(path, '/foo');
})