Rails.application.routes.draw do
  root to: 'doctors#new'
  get '/list', to: 'pages#list'
  get '/xls', to: 'pages#results'
  get '/test', to: 'pages#test'
  resources :members
  resources :doctors
end
