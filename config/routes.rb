Rails.application.routes.draw do
  root 'static#index'
  
  get '/about', to: 'static#about', as: :About
  
  get '/auth', to: 'twitch#auth', as: :AppAuth
end

