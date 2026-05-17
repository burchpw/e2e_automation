require 'dotenv'
require_relative '../lib/codec'

module LogInHelper

  def decrypt_credentials
    Dotenv.load
    Codec
        .new(
            key: ENV['credentials_key'],
            file_path: '../encrypted_data/credentials.yml'
        )
        .load_file
  end

  def load_credentials
    credentials = decrypt_credentials
    @user_name = credentials['user_name']
    @password = credentials['password']
  end

end