Meteor.Location = function (Deps) {
    "use strict";

    var pathName,
        queryString,
        currentLocationDeps = new Deps.Dependency();

    page(function (context) {
        var triggerChange = false;
        if (pathName !== context.pathname) {
            pathName = context.pathname;
            triggerChange = true;
        }
        if (queryString !== context.querystring) {
            queryString = context.querystring;
            triggerChange = true;
        }
        if (triggerChange) {
            currentLocationDeps.changed();
        }
    });
    page();

    return {
        getPath: function () {
            currentLocationDeps.depend();
            return pathName;
        },
        setPath: function (path) {
            page(path);
        },
        getQueryString: function () {
            currentLocationDeps.depend();
            return queryString;
        },
        setQueryString: function (query) {
            page(pathName + '?' + query);
        }
    };
}(Deps);
