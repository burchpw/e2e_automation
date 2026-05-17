require 'rspec'
require 'site_prism'
require_relative 'page_objects/pages'

Dir[File.dirname(__FILE__) + '/helpers/*.rb'].each {|file| require file }

RSpec.configure do |config|
  config.include Capybara::DSL
  config.include CupriteHelpers

  # Run tests in random order
  config.order = :random
  # Test Setup
  config.before(:example, type: :feature) do
    include CapybaraHelper
  end

  # Test Clean Up
  config.append_after(:example, type: :feature) do
    # Clear Browesr data
    page.driver.clear_network_traffic
    page.driver.clear_memory_cache
    page.driver.clear_cookies
    page.driver.browser.reset
    Capybara.reset_sessions!
  end
end