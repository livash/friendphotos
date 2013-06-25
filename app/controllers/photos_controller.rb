class PhotosController < ApplicationController
  before_filter :logged_in

  def index
    @photos = current_user.photos

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @photos.to_json(include: :tags ) }
    end
  end

  def create
    @photo = current_user.photos.build(params[:photo])
    if @photo.save
      render :json => @photo
    else
      render :json => @photo.errors, :status => 400
    end
  end
end
