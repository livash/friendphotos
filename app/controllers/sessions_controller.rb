class SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by_username(params[:user][:username])
    if @user.verify_password(params[:user][:password])
      session[:session_token] = @user.issue_token!
      redirect_to photos_url
    else
      render :new
    end
  end

  def destroy

  end

end
