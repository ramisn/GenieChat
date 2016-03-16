class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def github

    p request.env["omniauth.auth"]

    @user = User.find_for_github_oauth(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      sign_in :user, @user
      redirect_to dashboard_url
    else
      redirect_to root_path
    end
  end

  def google_oauth2
    @user = User.find_for_google_oauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in :user, @user
      redirect_to dashboard_url
    else
      redirect_to new_user_registration_path
    end
  end

  def passthru
    render :file => "#{Rails.root}/public/404.html", :status => 404, :layout => false
  end

end