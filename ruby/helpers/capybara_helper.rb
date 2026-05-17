require 'capybara'
require 'capybara/rspec'
require "capybara/cuprite"
require 'capybara-screenshot/rspec'

module CapybaraHelper
  # Driver Setup
  Capybara.register_driver(:cuprite) do |app|
    Capybara::Cuprite::Driver
        .new(
            app,
            **{
                inspector: ENV['INSPECTOR'],
                window_size: [1200, 800],
                headless: ENV['HEADLESS'].nil? ? true : ENV['HEADLESS'] == "true",
                js_errors: true,
                timeout: 10,
                process_timeout: 10
            }
        )
  end

  # Screen shot setup
  Capybara::Screenshot.register_driver(:cuprite) do |driver,path|
    driver.save_screenshot(path)
  end
  Capybara::Screenshot.autosave_on_failure = true

  Capybara.current_driver = :cuprite
  # Set Capybara config
  Capybara.configure do |c|
    c.javascript_driver = :cuprite
    c.app_host = 'https://practicetestautomation.com/'
    c.run_server = false
    c.default_max_wait_time = 10
    c.save_path = './test_results/screenshot'
    c.default_driver = :cuprite
  end
end