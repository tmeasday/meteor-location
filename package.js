Package.describe({
    summary: "A reactive version of window.location with history support"
});

Package.on_use(function (api, where) {
  api.use(['deps', 'page-js-ie-support'], 'client');
  
  api.add_files('location.js', 'client');
});


Package.on_test(function (api) {
  api.use(['tinytest', 'meteor-location'], 'client');
  
  api.add_files('location_tests.js', 'client');
});
