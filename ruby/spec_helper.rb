require 'rspec'
require 'capybara'
require 'capybara/rspec'
require "capybara/cuprite"
require 'capybara-screenshot/rspec'
require 'site_prism'
require_relative 'page_objects/pages'

RSpec.configure do |config|
  config.include Capybara::DSL

  # Test Setup
  config.before(:example, type: :feature) do
    # Driver Setup
    Capybara.javascript_driver = :cuprite
    Capybara.register_driver(:cuprite) do |app|
      Capybara::Cuprite::Driver.new(app, window_size: [1200, 800])
    end

    # Screen shot setup
    Capybara::Screenshot.register_driver(:cuprite) do |driver,path|
      driver.save_screenshot(path)
    end
    Capybara::Screenshot.autosave_on_failure = true

    Capybara.app_host = 'https://practicetestautomation.com/'
    Capybara.run_server = false
    Capybara.default_max_wait_time = 30
    Capybara.save_path = './test_results/screenshot'
    Capybara.current_driver = :cuprite
  end

  # Test Clean Up
  config.append_after(:example, type: :feature) do
    Capybara.reset_sessions!
  end
end