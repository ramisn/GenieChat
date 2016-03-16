class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.references :room
      t.references :user
      t.timestamps
    end
  end
end
