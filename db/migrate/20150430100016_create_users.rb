class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :twitch_id
      t.string  :name
      t.string  :display_name
      t.string  :email, default: ""
      t.string  :oauth_token
      t.string  :session
      t.timestamps
    end
  end
end
