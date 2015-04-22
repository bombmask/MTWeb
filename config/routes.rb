Rails.application.routes.draw do
  root 'static#index'
  
  get '/about', to: 'static#about', as: :About
  
  get '/util/authentication', to: 'static#util#auth', as: :AppAuth
end

