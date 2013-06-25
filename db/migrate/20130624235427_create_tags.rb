class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :photo_id
      t.integer :friend_id
      t.integer :x_coord
      t.integer :y_coord

      t.timestamps
    end
  end
end
