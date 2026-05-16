Dir[File.dirname(__FILE__) + '/pages/*.rb'].each {|file| require file }

class Pages

  def login_page
    LoginPage.new
  end

  def logout_page
    LogoutPage.new
  end

end