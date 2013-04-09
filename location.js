Meteor.Location = function (Deps) {
    "use strict";

    var pathName,
        queryString,
        currentLocationDeps = new Deps.Dependency();

    page(function (route) {
        var triggerChange = false;
        if (pathName !== route.pathname) {
            pathName = route.pathname;
            triggerChange = true;
        }
        if (queryString !== route.querystring) {
            queryString = route.querystring;
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
