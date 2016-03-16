class Room < ActiveRecord::Base
  acts_as_api
  extend FriendlyId
  friendly_id :name, use: :slugged

  include Rails.application.routes.url_helpers

  belongs_to :user
  has_many :messages, dependent: :destroy
  has_many :attachments

  NAME_MAX_LENGTH = 50

  validates :name, presence: true, uniqueness: true, length: {maximum: NAME_MAX_LENGTH}

  def url
    room_url(self)
  end

  api_accessible :room do |template|
    template.add :slug
    template.add :user
    template.add :name
    template.add :created_at
    template.add :updated_at
    template.add :url
  end

  def as_json(options={})
    super.merge(url: url)
  end

end
