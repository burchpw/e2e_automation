class LogoutPage < SitePrism::Page
  set_url 'logged-in-successfully'
  load_validation { has_log_out_button? }

  def log_out_button
    Capybara.find_link('Log out')
  end

end