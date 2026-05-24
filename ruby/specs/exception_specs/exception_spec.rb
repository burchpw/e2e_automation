require_relative '../../spec_helper.rb'

describe 'exception page', type: :feature do

  before(:each) do
    @pages = Pages.new
  end

  let(:exception_page){ @pages.exception_page }

  it 'handles adding row' do
    exception_page.load

    exception_page.rows.first.add_button.click
    SitePrism::Waiter.wait_until_true { exception_page.rows.count == 2 }

    expect(exception_page.confirmation.text).to have_text 'Row 2 was added'
    expect(exception_page.rows.last.text_field.visible?).to be true
  end

  it 'handles removing row' do
    exception_page.load

    exception_page.rows.first.add_button.click
    SitePrism::Waiter.wait_until_true { exception_page.rows.count == 2 }

    exception_page.rows.last.remove_button.click

    expect(exception_page.confirmation.text).to have_text 'Row 2 was removed'
  end

  it 'saves text to added row' do
    test_text = 'Test Adding Row'
    exception_page.load

    exception_page.rows.first.add_button.click
    SitePrism::Waiter.wait_until_true { exception_page.rows.count == 2 }

    added_row = exception_page.rows.last
    added_row.text_field.send_keys test_text
    added_row.save_button.click

    exception_page.wait_until_element_returns_true( added_row.edit_button.visible? )

    expect(added_row.text_field.value).to have_text test_text
  end

  it 'updates default row text' do
    test_text = 'Test Updating Row Text'
    exception_page.load

    default_row =  exception_page.rows.first
    default_row.edit_button.click

    exception_page.wait_until_element_returns_true( default_row.save_button.visible? )

    default_row.text_field.send_keys test_text
    default_row.save_button.click

    exception_page.wait_until_element_returns_true( default_row.edit_button.visible? )

    expect(default_row.text_field.value).to have_text test_text
  end

  it 'removes instructions element when row added' do
    exception_page.load

    exception_page.rows.first.add_button.click
    SitePrism::Waiter.wait_until_true { exception_page.rows.count == 2 }

    expect(exception_page.has_no_instructions?).to be true
  end

end