class LoginPage < SitePrism::Page
  set_url 'practice-test-login'
  load_validation { has_email? }

  element :email, 'input[name="username"]'
  element :password, 'input[name="password"]'

  def submit_button
    Capybara.find_button('Submit')
  end
end