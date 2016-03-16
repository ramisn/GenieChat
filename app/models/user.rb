class User < ActiveRecord::Base
  has_many :rooms
  has_many :messages
  has_many :invitations

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  def self.find_for_google_oauth(auth)
    info = auth[:info]
    uid = auth[:uid]
    email = info[:email]

    user = User.where(email: email).first

    if user.nil?
      user = User.create(
        username: "gplus_#{uid}",
        email: email,
        password: Devise.friendly_token[0, 20],
        name: info[:name],
        gplus_avatar_url: info[:image],
        url: "https://plus.google.com/#{uid}",
        source: :gplus
      )
    end

    user
  end

  def avatar_url
    case source
    when 'github'
      gravatar_url
    when 'gplus'
      gplus_avatar_url
    end
  end

  def as_json(options={})
    super.merge(avatar_url: avatar_url)
  end

end