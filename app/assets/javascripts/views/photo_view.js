App.Views = {};

App.Views.Photos = function(photosList) {
  this.photosList = photosList;
  this.$el = $('<div>');
}

App.Views.Photo = function(photo) {
  this.photo = photo;
  this.$el = $('<div>');
}

App.Views.Photo.prototype.render = function () {
  var tempFn = _.template($('#photo-view-temp').html());
  var content = tempFn({photo: this.photo});

  this.$el.append(content);
  this.setClickHandlers();
  return this.$el;
}

App.Views.Photo.prototype.setClickHandlers = function () {
  this.$el.find('a').on("click", function(event) {
    var indexView = new App.Views.Photos(App.Model.Photo._all);
    $("#main-div").html(indexView.render());
  });
  var that = this;
  this.$el.find('img').on('click', function (e) {
    var offset = $(this).offset();
    var width = $(this).width();
    var height = $(this).height();
    var tagx = Math.round((e.clientX - offset.left)/width * 100);
    var tagy = Math.round((e.clientY - offset.top)/height * 100);

    var friends = $('<select>');
    friends.append($("<option>").text("test"));

    friends.css({
      "position": "absolute",
      "margin-left" : e.clientX + "px",
      "margin-top" : e.clientY + "px"
    });
    that.$el.prepend(friends);
  });
}

App.Views.Photos.prototype.render = function() {
  var tempFn = _.template($('#photos-index-temp').html());
  var content = tempFn({photos: this.photosList});
  this.$el.append(content);
  this.setClickHandlers();
  return this.$el;
}

App.Views.Photos.prototype.setClickHandlers = function() {
  this.$el.find("form").on('submit', function(event) {
    event.preventDefault();
    var params = $(this).serialize();
    App.Model.Photo.addPhoto(params);
  });

  this.$el.find('img').on("click", function(event) {
    var photo = new App.Views.Photo(App.Model.Photo.find(parseInt($(this).attr("data-id"))));
    $("#main-div").html(photo.render());
  });
}