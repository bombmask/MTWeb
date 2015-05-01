class User < ActiveRecord::Base

  validates_presence_of :twitch_id, :name, :oauth_token

  def User.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end
end
