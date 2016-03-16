class Api::MessagesController < ApplicationController

  before_action :authenticate_user!
  before_action :find_room

  def index
    respond_to do |format|
      format.json { render_for_api :message, json: @room.messages.includes(:user) }
    end
  end

  def create
    respond_to do |format|
      format.json do
        message = Message.new(message_params)
        message.room = @room
        message.user = current_user

        if message.save
          render_for_api :message, json: message
        else
          render json: {message: message.errors.full_messages}, status: :bad_request
        end
      end
    end
  end

  private

  def message_params
    params.required(:message).permit(:content)
  end

  def find_room
    @room = Room.friendly.find(params[:room_id])
  end

end
