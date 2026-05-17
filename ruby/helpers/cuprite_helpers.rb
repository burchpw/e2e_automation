module CupriteHelpers
  # drop pause in specs to pause browser
  def pause
    page.driver.pause
  end

  # drop in specs to pause and show debug information.
  # Requires:
  # INSPECTOR ENV set to true
  # HEADLESS ENV set to false
  def debug(*args)
    page.driver.debug(*args)
  end

end