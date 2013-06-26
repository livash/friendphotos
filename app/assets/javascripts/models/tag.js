App.Model.Tag = function(params) {
  this.id = params.id;
  this.photo_id = params.photo_id;
  this.friend_id = params.friend_id;
  this.x_coord = params.x_coord;
  this.y_coord = params.y_coord;
  this.friendName = _(App.Store.current_user.friends).findWhere({
    id: this.friend_id
  }).name;
};

App.Model.Tag.addTag = function (params, callback) {
  $.ajax({
    url: "/tags",
    type: "post",
    data: params,
    success: function (tag) {
      var photo = _(App.Model.Photo._all).findWhere({id: tag.photo_id});
      var newTag = new App.Model.Tag(tag);
      photo.tags.push(newTag);
      callback();
    }
  });
};


