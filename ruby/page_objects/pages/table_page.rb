class TablePage < SitePrism::Page
  set_url 'practice-test-table'
  load_validation { has_filters? }

  element :filters, '#xpath-table'
  element :courses_table, '#courses_table'
  element :reset_button, '#resetFilters'
  element :table_no_data, '#noData'

  # Language Filters
  element :language_selection_any, 'input[value="Any"]'
  element :language_selection_java, 'input[value="Java"]'
  element :language_selection_python, 'input[value="Python"]'

  # Level Filters
  element :level_beginner, 'input[value="Beginner"]'
  element :level_intermediate, 'input[value="Intermediate"]'
  element :level_advanced, 'input[value="Advanced"]'

  # Min Enrollment Filter
  element :min_enrollment_button, '#enrollDropdown'

  element :any, '#enrollDropdown ul li[data-value="any"]'
  element :five_thousand_plus, '#enrollDropdown ul li[data-value="5000"]'
  element :ten_thousand_plus, '#enrollDropdown ul li[data-value="10000"]'
  element :fifty_thousand_plus, '#enrollDropdown ul li[data-value="50000"]'

  # Course Sorting
  element :sort_by, '#sortBy'

  def select_sort_by_option(text)
    sort_by.find(:option, text).select_option
  end

  # Course Table Rows
  sections :courses_table_rows, '#courses_table tbody tr' do
    element :row_id, 'td[data-col="id"]'
    element :row_course, 'td[data-col="course"]'
    element :row_language, 'td[data-col="language"]'
    element :row_level, 'td[data-col="level"]'
    element :row_enrollment, 'td[data-col="enrollments"]'
    element :row_link, 'td[data-col="link"]'
  end

end

