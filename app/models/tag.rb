class Tag < ActiveRecord::Base
  attr_accessible :friend_id, :photo_id, :x_coord, :y_coord

  belongs_to :photo

  #belongs_to :user, :through => :photo, :source => :owner

  belongs_to :friend,
  :class_name => "User",
  :foreign_key => :friend_id

end
