AngularChat::Application.routes.draw do
  devise_for :users, controllers: {omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'sessions'} do
    get '/users/auth/:provider' => 'users/omniauth_callbacks#passthru'
  end

#  devise_for :users,controllers: {sessions: 'sessions'}

  get '/dashboard' => 'dashboard#index'
  post '/pusher/auth' => 'pusher#auth'

  resources :rooms

  namespace :api do
    resources :rooms do
      member do
        post :upload
      end

      resources :messages
      resources :attachments
    end

    resources :invitations, only: [:create]

    get '/aws/s3_access_token' => 'aws#s3_access_token'
  end

  root to: 'home#index'
end
