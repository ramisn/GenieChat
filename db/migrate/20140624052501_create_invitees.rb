class CreateInvitees < ActiveRecord::Migration
  def change
    create_table :invitees do |t|
      t.references :invitation
      t.string :email
      t.timestamps
    end
  end
end
