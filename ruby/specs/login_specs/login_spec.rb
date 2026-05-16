require_relative '../../spec_helper.rb'

describe 'user login', type: :feature do
  before(:each) do
    @pages = Pages.new
  end

  it 'page loads' do
    login_page = @pages.login_page
    login_page.load

    expect(login_page.email.visible?).to be true
  end

  it 'handles blank form submission' do
    login_page = @pages.login_page
    login_page.load
    login_page.submit_button.click

    expect(@pages.logout_page.loaded?)
  end

end