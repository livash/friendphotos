App.Views.Photos = function(photosList) {
  this.photosList = photosList;
  this.$el = $('<div>');
}

App.Views.Photo = function(photo) {
  this.photo = photo;
  this.$el = $('<div class="photo-div">');
}

App.Views.Photo.prototype.render = function () {
  var that = this;
  var tempFn = JST['templates/photo'];
  var content = tempFn({photo: this.photo});
  this.$el.html(content); //

  //insert tags if any
  _(this.photo.tags).each(function(tag){
    var tagView = new App.Views.Tag(tag);
    var tagObj = tagView.render();
       console.log(tagObj);
    that.$el.prepend(tagObj);
  });

  this.setClickHandlers();
  return this.$el;
}

App.Views.Photo.prototype.setClickHandlers = function () {
  this.$el.find('a').on("click", function(event) { //link
    var indexView = new App.Views.Photos(App.Model.Photo._all);
    $("#main-div").html(indexView.render());
  });

  var that = this;
  this.$el.find('img').on('click', function (e) { //image
    var img = this;
    var offset = $(this).offset();
    console.log("offset (l): " + offset.left + " offset (t): " + offset.top);

    var width = $(this).parent().width();
    var height = $(this).parent().height();

    console.log("Width: " + width + " height: " + height);

    var tagx = Math.round((e.clientX)/width * 100);
    var tagy = Math.round((e.clientY)/height * 100);

    var select = that.addTagSelect(e);
    that.$el.prepend(select);

    $('#add-tag').on("click", function (event) {
      var friendId = that.$el.find('select').val();
      var params = { tag: {
        friend_id: friendId,
        x_coord: tagx,
        y_coord: tagy,
        photo_id: $(img).attr('data-id')
      }};
      App.Model.Tag.addTag(params, function() {
        $('#main-div').html('');
        $('#main-div').html(that.render());
      });
    });
  });
}

App.Views.Photo.prototype.addTagSelect = function (event) {
  var tempFn = JST['templates/new_tag'];
  var content = tempFn({e: event});
  return content;
}

App.Views.Photos.prototype.render = function() {
  var tempFn = JST['templates/photos'];
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