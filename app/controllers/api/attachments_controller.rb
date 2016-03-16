class Api::AttachmentsController < ApplicationController

  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.json do
        room = Room.find(params[:room_id])
        render json: room.attachments
      end
    end
  end

end
