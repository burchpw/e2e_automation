# e2e_automation
Project to showcase E2E Automation

## Test Site
Test Austomation built to run against [Practice Test Austomation](https://practicetestautomation.com/practice/)

## Ruby Automation
Ruby Version: 4.02  
Gems Used:
1. [Capybara](https://github.com/teamcapybara/capybara)
2. [Capybara Screenshot](https://github.com/mattheworiordan/capybara-screenshot)
3. [Cuprite](https://github.com/rubycdp/cuprite)
4. [Ferreum](https://github.com/rubycdp/ferrum)
5. [Rspec](https://github.com/rspec/rspec)
6. [Lockbox](https://github.com/ankane/lockbox)
7. [Yaml](https://github.com/ruby/yaml)
8. [Dotenv](https://github.com/bkeepers/dotenv)

### Summary
Ruby browser based testing using Chrome browser API

### Running Tests
Tests Run Headless on local chrome browser by default:  
`bundle exec rspec `specs/**/*_spec.rb`

Run Tests Non Headless:   
`HEADLESS=false bundle exec rspec specs/**/*_spec.rb`

Run Tests with inspector for Debugging:   
`INSPECTOR=true HEADLESS=false bundle exec rspec specs/**/*_spec.rb`

### Cuprite Helpers
`pause` add to a spec to pause execution at that code location
example:  
```ruby
it 'handles blank form submission' do
    login_page = @pages.login_page
    login_page.load
    pause
    login_page.submit_button.click

    expect(@pages.logout_page.log_out_button.visible?)
 end
```

`debug` add to a spec to start debugging at that code location. Requires INSPECTOR env set to `true` and
HEADLESS env set to `false`   
example:  
```ruby
it 'handles blank form submission' do
    login_page = @pages.login_page
    debug
    login_page.load
    login_page.submit_button.click

    expect(@pages.logout_page.log_out_button.visible?)
  end

```