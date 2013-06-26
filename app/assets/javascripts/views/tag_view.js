App.Views.Tag = function(tag) {
  this.username = tag.username;
  this.id = tag.id;
  this.friend = tag.friendName;
  this.x_coord = tag.x_coord;
  this.y_coord = tag.y_coord;
};

App.Views.Tag.prototype.render = function() {
  var tempFn = JST['templates/tag'];
  var content = tempFn({ tag: this });
  return content;
}

