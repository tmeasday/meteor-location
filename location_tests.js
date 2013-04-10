(function (Tinytest, Location, Deps) {
    "use strict";

    Tinytest.add('Location - Init with current location', function (test) {
        // This test has to run first ...
        test.equal(Location.getPath(), window.location.pathname);
    });

    Tinytest.add('Location - getPath is reactive', function (test) {
        var path;
        Deps.autorun(function () {
            path = Location.getPath();
        });
        Location.setPath('/foo');
        Meteor.flush();

        test.equal('/foo', path);
    });

    Tinytest.add('Location - queryString is reactive', function (test) {
        var queryString;
        Deps.autorun(function () {
            queryString = Location.getQueryString();
        });
        Location.setQueryString('bar');
        Meteor.flush();

        test.equal('bar', queryString);
    });
}(Tinytest, Meteor.Location, Deps));
