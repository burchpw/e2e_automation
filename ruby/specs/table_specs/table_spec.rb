require_relative '../../spec_helper.rb'

describe 'table page', type: :feature do

  before(:each) do
    @pages = Pages.new
  end

  let(:table_page){ @pages.table_page }

  let(:all_course_ids) do
    %w[1517620 1693880 1743612 1904956 2854476 3970682 4536644 4824578 5393658]
  end

  it 'filters by language Java' do
    table_page.load

    table_page.language_selection_java.click

    field_text = table_page
                     .courses_table_rows
                     .map(&:row_language)
                     .map(&:text)

    expect(field_text).to all(eq('Java'))
  end

  it 'filters by level beginner only' do
    table_page.load

    table_page.level_intermediate.click
    table_page.level_advanced.click

    field_text = table_page
                     .courses_table_rows
                     .map(&:row_level)
                     .map(&:text)

    expect(field_text).to all(eq('Beginner'))
  end

  it 'filters by minimum enrollment 10,000+' do
    table_page.load

    table_page.min_enrollment_button.click
    table_page.ten_thousand_plus.click

    field_integers = table_page
                     .courses_table_rows
                     .map(&:row_enrollment)
                     .map(&:text)
                     .map(&:to_i)

    expect(field_integers).to all(be >= 10000)
  end

  it 'filters by combined filters Python, Beginner, and 10,000+' do
    table_page.load

    # Set Language filter
    table_page.language_selection_python.click

    # Set Level filter (note all level filters selected by default)
    table_page.level_intermediate.click
    table_page.level_advanced.click

    # Set Enrollment Minimum filter
    table_page.min_enrollment_button.click
    table_page.ten_thousand_plus.click

    field_text = table_page
                     .courses_table_rows
                     .map(&:row_id)
                     .map(&:text)

    expect(field_text).to all(eq('4824578'))
  end


  it 'filters by combined filters for no result' do
    table_page.load

    # Set Language filter
    table_page.language_selection_python.click

    # Set Level filter (note all level filters selected by default)
    table_page.level_beginner.click

    # Set Enrollment Minimum filter
    table_page.min_enrollment_button.click
    table_page.ten_thousand_plus.click

    expect(table_page.table_no_data.visible?).to be true
  end

  it 'resets filters with reset button' do
    table_page.load

    # Set Language filter
    table_page.language_selection_python.click

    # Set Level filter (note all level filters selected by default)
    table_page.level_intermediate.click
    table_page.level_advanced.click

    # Set Enrollment Minimum filter
    table_page.min_enrollment_button.click
    table_page.ten_thousand_plus.click

    # Select Reset button
    table_page.reset_button.click

    # Check Filters Reset
    ## Language filter
    expect(table_page.language_selection_any).to be_checked

    ## Level filter
    expect(table_page.level_beginner).to be_checked
    expect(table_page.level_intermediate).to be_checked
    expect(table_page.level_advanced).to be_checked

    ## Enrollment Minimum filter
    expect(table_page.min_enrollment_button.text).to eq('Any')

    # Check Courses Table Reset
    field_text = table_page
                     .courses_table_rows
                     .map(&:row_id)
                     .map(&:text)

    expect(field_text).to match_array(all_course_ids)
  end

  it 'sorts courses table by selected sort Enrollments ascending' do
    table_page.load

    table_page.select_sort_by_option("Enrollment")

    field_integers = table_page
                         .courses_table_rows
                         .map(&:row_enrollment)
                         .map(&:text)
                         .map(&:to_i)

    # Verify all enrollment rows are equal or increasing by breaking the array into
    # an arry of 2 par arrays and verifying the values are increasing or equal
    expect(field_integers.each_cons(2)).to all( satisfy { |a, b| a <= b })
  end

  it 'sorts course table by selected sort Course Name alphabetical' do
    table_page.load

    table_page.select_sort_by_option("Course Name")

    field_text = table_page
                     .courses_table_rows
                     .map(&:row_course)
                     .map(&:text)

    # Verify courses in alphabetical order by comparing the field_text array to
    # a sorted version of the array
    expect(field_text).to eq(field_text.sort)
  end
end