class AddSourceAndGplusAvatarUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :source, :string
    add_column :users, :gplus_avatar_url, :string
  end
end
