class ExceptionPage < SitePrism::Page
  set_url 'practice-test-exceptions'
  load_validation { has_instructions? }

  element :instructions, '#instructions'
  element :confirmation, '#confirmation'

  sections :rows, '.row' do
    element :text_field, 'input.input-field'
    element :edit_button, '#edit_btn'
    element :add_button, '#add_btn'
    element :save_button, '#save_btn'
    element :remove_button, '#remove_btn'
  end

  def wait_until_element_returns_true( element )
    SitePrism::Waiter.wait_until_true { element }
  end

end