# Ruby Automation
## Summary
Ruby browser based testing using Chrome browser API

## Table of Contents
1. [Setup](#setup)  
   - [Credentials Setup](#credentials-setup)
2. [Running Tests Locally](#running-tests-locally)
3. [Cuprite Helpers](#cuprite-helpers)
4. [Docker](#docker)
   - [Build Docker Image](#build-docker-image)
   - [Run Tests In Docker](#running-tests-in-docker)

## Development Environment 
Ruby Version: 4.02  
Bundler Version: 4.0.6  
Gems Used:
1. [Capybara](https://github.com/teamcapybara/capybara)
2. [Capybara Screenshot](https://github.com/mattheworiordan/capybara-screenshot)
3. [Cuprite](https://github.com/rubycdp/cuprite)
4. [Ferreum](https://github.com/rubycdp/ferrum)
5. [Rspec](https://github.com/rspec/rspec)
6. [Lockbox](https://github.com/ankane/lockbox)
7. [Yaml](https://github.com/ruby/yaml)
8. [Dotenv](https://github.com/bkeepers/dotenv)

## Setup
1. Install [Bundler](https://bundler.io/) `gem install bundler -v 4.0.6`   
2. Run Bundler to install gems `bundle install`
3. Setup a credentials file [Credentials Setup](#credentials-setup)

### Credentials Setup
create a credentials.yml file:  
```yaml
user_name: #{name}
password: #{password}
```

start an irb session and run the following code:
```ruby
require_relative './lib/codec'

Codec.new(key: nil, file_path: '../encrypted_data/credentials.yml').existing_file_encyption
```

save the the key in a `.env` file with the variable name `CREDENTIAL_KEY`

## Running Tests Locally
Tests Run Headless on local chrome browser by default:  
```bash
bundle exec rspec specs/**/*_spec.rb
```

Run Tests Non Headless:   
```bash
HEADLESS=false bundle exec rspec specs/**/*_spec.rb
```

Run Tests with inspector for Debugging:   
```bash
INSPECTOR=true HEADLESS=false bundle exec rspec specs/**/*_spec.rb
```

## Cuprite Helpers
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

## Docker
Install [Docker Desktop](https://docs.docker.com/desktop/)

### Build Docker Image
Run the following command to build a docker image:   
```bash
docker build -t ruby_automation:latest .
```

This creates an image named `ruby_automation` with the image tag being `latest`

### Running Tests in Docker
After building the docker image run the following command to run the tests:  
```bash
docker run --rm -e CREDENTIAL_KEY=#{key} -v `pwd`/test_results/screenshot:/ruby/test_results/screenshot ruby_automation:latest bash -c 'bundle exec rspec specs/**/*_spec.rb'
```

This will run the tests using docker and show progress. Any error screen shots will be saved to the 
`test_results/screenshot` folder locally.