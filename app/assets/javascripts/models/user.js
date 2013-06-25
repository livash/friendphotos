App.Model.User = function (params) {
  this.name = params.username;
  this.friends = App.Model.User.fetchFriends();
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

App.Model.User.fetchFriends = function () {
  var friends;
  $.ajax({
    url: "/friends",
    type: "get",
    success: function (friendsParams) {
      friends = _(friendsParams).map(function (friend) {
        return { id: friend.id, name: friend.username };
      });
    }
  });
  return friends;
}

