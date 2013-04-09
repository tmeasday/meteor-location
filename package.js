Package.describe({
  summary: "A reactive version of window.location"
});

Package.on_use(function (api, where) {
  api.use('deps', 'client');
  api.use('page-js-ie-support', 'client');
  api.use('underscore', ['client', 'server']);
  
  api.add_files('location.js', 'client');
});


Package.on_test(function (api) {
  api.use('router', ['client', 'server']);
  api.use('test-helpers', ['client', 'server']);
  api.use('tinytest', ['client', 'server']);
  
  api.add_files('location_tests.js', 'client');
});
