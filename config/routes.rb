Rails.application.routes.draw do
  root 'static#index'

  get '/about',           to: 'static#about',   as: :about

  get '/blog',            to: 'posts#index',    as: :blog

  get '/utils/login',     to: 'twitch#out',     as: :twitch_out
  get '/utils/auth',      to: 'twitch#in',      as: :twitch_in

  get '/channels',        to: 'channels#index', as: :channels
  get '/channels/:name',  to: 'channels#show'

end
