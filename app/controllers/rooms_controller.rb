class RoomsController < ApplicationController

  before_action :authenticate_user!

  def show
    @room = Room.friendly.find(params[:id])
    gon.room = @room.as_json
    gon.pusher_key = Pusher.key
    gon.bistri_app_id = ENV['BISTRI_APP_ID']
    gon.bistri_app_key = ENV['BISTRI_APP_KEY']
    gon.current_user = current_user.as_json
  end

end
