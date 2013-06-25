FriendPhotos::Application.routes.draw do

  resource :session, only: [:new, :create, :destroy]
  resources :photos

end
