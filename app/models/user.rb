class User < ActiveRecord::Base
  attr_accessible :password_digest, :session_token, :username

  validates :username, presence: true
  def issue_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    return self.session_token
  end

  def password=(pass)
    self.password_digest = BCrypt::Password.create(pass)
  end

  def verify_password(pass)
    BCrypt::Password.new(pass) == self.password_digest
  end
end
