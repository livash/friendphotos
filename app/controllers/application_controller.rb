class ApplicationController < ActionController::Base
  protect_from_forgery

  def current_user
    return nil if session[:session_token].nil?
    @user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in
    if (current_user.session_token == session[:session_token])
    else
      redirect_to new_sessions_url
    end
  end
end
