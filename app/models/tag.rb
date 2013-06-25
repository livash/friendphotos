class Tag < ActiveRecord::Base
  attr_accessible :friend_id, :photo_id, :x_coord, :y_coord
end
