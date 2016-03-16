class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.references :user
      t.string :subject
      t.text :message
      t.timestamps
    end
  end
end
