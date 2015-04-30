class TwitchController < ApplicationController

  def out
    redirect_to "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=#{client_id}&redirect_uri=#{redirect_url}&scope=user_read"
  end

  def in
    twitch_response = HTTParty.post("https://api.twitch.tv/kraken/oauth2/token", query: full_info)
    puts twitch_response
    if twitch_response.success?
      oauth = twitch_response["access_token"]
      user_data = HTTParty.get("https://api.twitch.tv/kraken/user?oauth_token=#{oauth}")
      puts user_data
      unless user_data.success?
        flash[:error] = "There was an error retrieving your information from twitch."
        redirect_to root_path
        return
      end
    else
      flash[:error] = "There was an error connecting to twitch."
      redirect_to root_path
      return
    end

    @user = User.find_by(twitch_id: user_data["_id"])
    if @user.nil?
      @user = User.new(twitch_id: user_data["_id"], name: user_data["name"], display_name: user_data["display_name"], email: user_data["email"])
    end

    @user.session = User.digest((SecureRandom.urlsafe_base64).to_s)
    @user.oauth_token = oauth

    if @user.save
      sign_in @user
      redirect_to root_path
    else
      flash[:error] = @user.errors
      redirect_to root_path
    end
  end


  private

    def redirect_url
      if !Rails.env.development?
        "https://#{request.host_with_port}/utils/auth"
      else
        "http://#{request.host_with_port}/utils/auth"
      end
    end

    def client_id
      ENV["mask_client_id"]
    end

    def client_secret
      ENV["mask_client_secret"]
    end

    def full_info
      {
        client_id:     client_id,
        client_secret: client_secret,
        grant_type:    'authorization_code',
        redirect_uri:  redirect_url,
        code:          params[:code]
      }
    end
end
