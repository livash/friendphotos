App.Model.Tag = function(params) {
  this.id = params.id;
  this.photo_id = params.photo_id;
  this.friend_id = params.friend_id;
  this.x_coord = params.x_coord;
  this.y_coord = params.y_coord;
  this.friendName = App.Model.User.getFriendName(this.friend_id);
};

App.Model.Tag.addTag = function (params) {
  $.ajax({
    url: "/tags",
    type: "post",
    data: params,
    success: function (tag) {
      //display the tag
    }
  });
};

