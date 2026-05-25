require 'lockbox'

class Codec

  def initialize(key:, file_path:)
    if key.nil?
      # handle first time encyption
      key = Lockbox.generate_key
      @lockbox = Lockbox.new(key: key)
      puts "New Key: #{key}"
    else
      @lockbox = Lockbox.new(key: key)
    end

    @file = File.join(__dir__, file_path)
  end

  def load_file
    if File.extname(file) == '.yml'
      YAML.load(decypt_file_data)
    else
      raise "File Type Not Allowed"
    end
  end

  def existing_file_decryption
    decypt_file
  end

  def existing_file_encyption
    encypt_file
  end

  private
  attr_accessor :lockbox
  attr_reader :file

  def decypt_file_data
    lockbox.decrypt(File.binread(file))
  end

  def decypt_file
    File.write(file, lockbox.decrypt(File.binread(file)))
  end

  def encypt_file
    File.write(file, lockbox.encrypt(File.binread(file)))
  end
end