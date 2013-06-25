class Photo < ActiveRecord::Base
  attr_accessible :owner_id, :title, :url

  belongs_to :owner,
  :class_name => "User"

  has_many :tags

end
