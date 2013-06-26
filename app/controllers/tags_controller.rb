class TagsController < ApplicationController

  def create
    @tag = Tag.new(params[:tag])
    @tag.save!
    render :json => @tag
  end

end
