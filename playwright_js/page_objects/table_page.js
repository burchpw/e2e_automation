export class TablePage {
    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor( page ) {
        this.page = page;
        this.table_rows = page.locator('#courses_table tbody tr');
    }

    goto() {
        return this.page.goto('practice-test-table');
    }

    no_data_msg() {
        return this.page.locator('#noData')
    }

    reset_button() {
        return this.page.getByRole('button', { name: 'Reset' });
    }

    language_filter( text ) {
         return this.page.getByRole('radio', { name: text });
    }

    level_filter( text ) {
         return this.page.getByRole('checkbox', { name: text });
    }

    sort_select ( text ) {
        return this.page.locator('#sortBy').selectOption(text);
    }

    minimum_enrollment() {
        return this.page.locator('#enrollDropdown');
    }

    selected_enrollment() {
        return this.minimum_enrollment().locator('.dropdown-button');
        
    }

    select_min_enrollment() {
        const minEnrollmentLocator = this.minimum_enrollment();
        return new SelectMinEnrollment( minEnrollmentLocator );
    }

    async getColumnTextList(columnName) {
        const rowElements = new TableRowElements(this.table_rows);
        return await rowElements[columnName].visible().allInnerTexts();
    }
}

class TableRowElements {

    constructor( tableRowLocator ) {
        this.row_id = tableRowLocator.locator('td[data-col="id"]');
        this.row_course = tableRowLocator.locator('td[data-col="course"]');
        this.row_language = tableRowLocator.locator('td[data-col="language"]');
        this.row_level = tableRowLocator.locator('td[data-col="level"]');
        this.row_enrollment = tableRowLocator.locator('td[data-col="enrollments"]');
        this.row_link = tableRowLocator.locator('td[data-col="link"]');
    }
}

class SelectMinEnrollment {

    constructor( minEnrollmentLocator ) {
        this.any = minEnrollmentLocator.locator('li[data-value="any"]');
        this.five_thousand = minEnrollmentLocator.locator('li[data-value="5000"]');
        this.ten_thousand = minEnrollmentLocator.locator('li[data-value="10000"]');
        this.fifty_thousand = minEnrollmentLocator.locator('li[data-value="50000"]');
    }
}