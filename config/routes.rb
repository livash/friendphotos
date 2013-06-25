FriendPhotos::Application.routes.draw do

  resource :session, only: [:new, :create, :destroy]
  resources :photos

  resources :friends
  resource :user

end
