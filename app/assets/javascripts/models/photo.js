App.Model = {};

App.Model.Photo = function(params) {
  this.id = params.id;
  this.title = params.title;
  this.url = params.url;
};

App.Model.Photo.fetch = function (callback) {
  $.ajax({
    url: "/photos.json",
    type: "get",
    success: function(photosParams) {
      App.Model.Photo._all =
      _(photosParams).map(function(photoParams) {
        return new App.Model.Photo(photoParams);
      });

      callback(App.Model.Photo._all);
    }
  });
};

App.Model.Photo.find = function (id) {
  return _(App.Model.Photo._all).findWhere({id: id});
}

App.Model.Photo.addPhoto = function(params) {

  $.ajax({
    url: "/photos",
    type: "post",
    data: params,
    success: function(newPhoto) {
      var photo = new App.Model.Photo(newPhoto);
      console.log(App.Model.Photo._all);
      App.Model.Photo._all.push(photo);
      var indexView = new App.Views.Photos(App.Model.Photo._all);
      $("#main-div").html(indexView.render());
    },
    error: function (data){
      console.log(data);
    }
  });
}


