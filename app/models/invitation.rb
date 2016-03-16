class Invitation < ActiveRecord::Base

  has_many :invitees
  belongs_to :user

  attr_accessor :emails

  validate :emails_cannot_be_empty

  before_save do
    if new_record?
      emails.each { |e| invitees.build(email: e) }
    end
  end

  def emails_cannot_be_empty
    unless emails
      errors.add(:base, 'Please enter some emails')
    end
  end

  def send_invitation_to_invitees
    #TODO: use delayed_job
    invitees.each do |invitee|
      InvitationMailer.delay.chat_invitation(self, invitee)
    end
  end

end
