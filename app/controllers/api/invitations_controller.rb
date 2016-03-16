class Api::InvitationsController < ApplicationController

  before_action :authenticate_user!

  def create
    respond_to do |format|
      format.json do
        invitation = Invitation.new(invitation_params.merge(user: current_user))

        if invitation.save
          invitation.send_invitation_to_invitees
          head :ok
        else
          render json: {message: invitation.errors.full_messages}, status: :bad_request
        end
      end
    end
  end

  private

  def invitation_params
    params.require(:invitation).permit(:subject, :message, emails: [])
  end

end
