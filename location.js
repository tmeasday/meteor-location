/**
 * A reactive wrapper of `window.location` and the history API.
 *
 * It automatically intercepts all `<a>` links to the current domain without modifier keys, pushes the old request to
 * the history and sets the intercepted location as current target.
 *
 * All methods in this class are either  reactive (`get*`) or invalidating (`set*`). All functions provide access to the
 * same dependency - the current location. So if you change any part, all `get*`-methods will be invalidated and recalculated.
 *
 * @module Meteor.Location
 * @namespace Meteor
 * @main
 * @class Location
 * @static
 */
Meteor.Location = function (Deps) {
    "use strict";

    /**
     * The current request path.
     *
     * Made reactive by currentLocationDeps.
     *
     * @property pathName
     * @private
     * @type {String}
     */
    var pathName,

    /**
     * Current query string of the request, without the question mark
     *
     * Made reactive by currentLocationDeps.
     *
     * @property queryString
     * @private
     * @type {String}
     */
        queryString,

    /**
     * Meteor dependency tracking container for the variables pathName and queryString.
     *
     * @property currentLocationDeps
     * @private
     * @type {Deps.Dependency}
     */
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
        /**
         * Get the current request path.
         *
         * This function is reactive.
         *
         * @method getPath
         * @static
         * @returns {String}
         */
        getPath: function () {
            currentLocationDeps.depend();
            return pathName;
        },

        /**
         * Set the current request path and push the old location to the history.
         *
         * This function is reactive.
         *
         * @method setPath
         * @static
         * @param {String} path
         */
        setPath: function (path) {
            page(path);
        },

        /**
         * Get the current query string of the request.
         *
         * This does not include the question mark delimiter. This function is reactive.
         *
         * @method getQueryString
         * @static
         * @returns {String}
         */
        getQueryString: function () {
            currentLocationDeps.depend();
            return queryString;
        },

        /**
         * Set the current query string and push the old location and query string to the history.
         *
         * No need to include the question mark delimiter.
         *
         * @method setQueryString
         * @static
         * @param {String} query
         */
        setQueryString: function (query) {
            page(pathName + '?' + query);
        }
    };
}(Deps);
