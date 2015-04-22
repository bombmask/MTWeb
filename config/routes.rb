Rails.application.routes.draw do
  root 'static#index'
  
  get '/about', to: 'static_pages#about', as: :about
  
  get 'util/authentication', to: 'static_pages#util#auth', as: :AppAuth
end
