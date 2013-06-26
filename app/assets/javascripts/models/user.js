App.Model.User = function (params) {
  this.name = params.username;
  var that = this;
  App.Model.User.fetchFriends(function (friends) {
    that.friends = friends;
  });
};

App.Model.User.fetch = function(callback) {
  $.ajax({
    url: "/user",
    type: "get",
    success: function (userParams) {
      App.Store.current_user = new App.Model.User(userParams);
      callback(App.Store.current_user);
    }
  });
};

App.Model.User.fetchFriends = function (callback) {
  $.ajax({
    url: "/friends",
    type: "get",
    success: function (friendsParams) {
      var friends = _(friendsParams).map(function (friend) {
        return { id: friend.id, name: friend.username };
      });

      callback(friends);
    }
  });
}

