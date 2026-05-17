require_relative '../../spec_helper.rb'

describe 'user login', type: :feature do
  include LogInHelper

  before(:each) do
    @pages = Pages.new
    load_credentials
  end

  let(:login_page){ @pages.login_page }

  it 'logs the user in' do
    login_page.load

    login_page.user_name.visible?
    login_page.user_name.send_keys @user_name
    login_page.password.visible?
    login_page.password.send_keys @password
    login_page.submit_button.visible?
    login_page.submit_button.click

    expect(@pages.logout_page.log_out_button.visible?)
  end

  it 'handles incorrect user_name' do
    login_page.load

    login_page.user_name.visible?
    login_page.user_name.send_keys "incorrectUser"
    login_page.password.visible?
    login_page.password.send_keys @password
    login_page.submit_button.visible?
    login_page.submit_button.click

    expect(login_page.error_message.text).to eq('Your username is invalid!')
  end

  it 'handles incorrect password' do
    login_page.load

    login_page.user_name.visible?
    login_page.user_name.send_keys @user_name
    login_page.password.visible?
    login_page.password.send_keys 'incorrectPassword'
    login_page.submit_button.visible?
    login_page.submit_button.click

    expect(login_page.error_message.text).to eq('Your password is invalid!')
  end

  it 'handles blank form submission' do
    login_page.load
    login_page.submit_button.click

    expect(login_page.error_message.text).to eq('Your username is invalid!')
  end

end