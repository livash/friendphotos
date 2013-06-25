class SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by_username(params[:username])
    if @user.verify_password
      session[:session_token] = @user.issue_token!
    else
      render :new
    end
  end

  def destroy

  end

end
