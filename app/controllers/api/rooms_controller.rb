class Api::RoomsController < ApplicationController

  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.json { render_for_api :room, json: Room.limit(50).includes(:user) }
    end
  end

  def create
    respond_to do |format|
      format.json do
        room = Room.new(room_params)
        room.user = current_user
        if room.save
          render_for_api :room, json: room
        else
          render json: {message: room.errors.full_messages}, status: :bad_request
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        room = Room.find(params[:id])
        room.destroy
        head :ok
      end
    end
  end

  def upload
    respond_to do |format|
      format.html do
        room = Room.find(params[:id])

        attachment = room.attachments.new(user: current_user, file: params[:file])

        if attachment.save
          render json: attachment
        else
          render json: attachment.errors.full_messages, status: :bad_request
        end
      end
    end
  end

  private

  def room_params
    params.required(:room).permit(:name)
  end

end
