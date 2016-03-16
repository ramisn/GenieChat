class InvitationMailer < ActionMailer::Base

  default from: 'noreply@ng-github-chat.herokuapp.com', content_type: 'text/html'

  def chat_invitation(invitation, invitee)
    @invitation = invitation
    @invitee = invitee
    mail(to: @invitee.email, subject: @invitation.subject)
  end

end