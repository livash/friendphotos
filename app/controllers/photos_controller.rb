class PhotosController < ApplicationController
  before_filter :logged_in

  def index
    @photos = current_user.photos
  end
end
