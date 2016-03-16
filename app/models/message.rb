class Message < ActiveRecord::Base

  include ActionView::Helpers::TextHelper

  acts_as_api

  belongs_to :room
  belongs_to :user

  api_accessible :message do |template|
    template.add :id
    template.add :user
    template.add :auto_linked_content, as: :content
    template.add :created_at
    template.add :updated_at
  end

  def auto_linked_content
    return '' if content.blank?
    auto_link(content, html: {target: '_blank'})
  end

end