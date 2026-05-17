class LoginPage < SitePrism::Page
  set_url 'practice-test-login'
  load_validation { has_user_name? }

  element :user_name, 'input[name="username"]'
  element :password, 'input[name="password"]'
  element :error_message, '#error'

  def submit_button
    Capybara.find_button('Submit')
  end
end