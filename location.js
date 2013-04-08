var Location = function() {
  this._locationListeners = new Deps.Dependency;
  
  // start it up
  page('*', _.bind(this._locationChanged, this));
}

Location.prototype._locationChanged = function() {
  this._locationListeners.changed();
}

/**************** PUBLIC API **********************/

Location.prototype.href = function() {
  Deps.depend(this._locationListeners);
  return window.location.href;
}

Location.prototype.path = function() {
  Deps.depend(this._locationListeners);
  return window.location.pathname;
}

Location.prototype.setPath = function(path) {
  page(path);
}

// "export"
Meteor.Location = new Location;