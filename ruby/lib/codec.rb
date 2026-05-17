require 'lockbox'

class Codec
  attr_reader :lockbox, :file

  def initialize(key: , file_path:)
    @lockbox = Lockbox.new(key: key)
    @file = File.join(__dir__, file_path)
  end

  def load_file
    if File.extname(file) == '.yml'
      YAML.load(decypt_file)
    else
      raise "File Type Not Allowed"
    end
  end

  private

  def decypt_file
    lockbox.decrypt(File.binread(file))
  end

  def encypt_file
    File.write(file, lockbox.encrypt(File.binread(file)))
  end
end