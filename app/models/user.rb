require 'bcrypt'
require 'securerandom'

class User < ActiveRecord::Base
  attr_accessible :password, :session_token, :username

  validates :username, presence: true

  has_many :photos,
  :foreign_key => :owner_id

  #has_many :tags, :through => :photos, :source => :tags

  has_many :taggings,
  :class_name => "Tag",
  :foreign_key => :friend_id

  def issue_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    return self.session_token
  end

  def password=(pass)
    self.password_digest = BCrypt::Password.create(pass)
  end

  def verify_password(pass)
     BCrypt::Password.new(self.password_digest) == pass
  end
end
