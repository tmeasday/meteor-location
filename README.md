Meteor.Location
==============
A reactive wrapper of `window.location` and the history API.

It automatically intercepts all `<a>` links to the current domain without modifier keys, pushes the old request to the history and sets the intercepted location as current target.

All methods in this class are either  reactive (`get*`) or invalidating (`set*`). All functions provide access to the same dependency - the current location. So if you change any part, all `get*`-methods will be invalidated and recalculated.
