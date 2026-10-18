export class TablePage {
    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor( page ) {
        this.page = page;
        this.tableRows = page.locator('#courses_table tbody tr');
    }

    goto() {
        return this.page.goto('practice-test-table');
    }

    noDataMsg() {
        return this.page.locator('#noData')
    }

    resetButton() {
        return this.page.getByRole('button', { name: 'Reset' });
    }

    languageFilter( text ) {
         return this.page.getByRole('radio', { name: text });
    }

    levelFilter( text ) {
         return this.page.getByRole('checkbox', { name: text });
    }

    sortSelect ( text ) {
        return this.page.locator('#sortBy').selectOption(text);
    }

    minimumEnrollment() {
        return this.page.locator('#enrollDropdown');
    }

    selectedEnrollment() {
        return this.minimumEnrollment().locator('.dropdown-button');
        
    }

    selectMinEnrollment() {
        const minEnrollmentLocator = this.minimumEnrollment();
        return new SelectMinEnrollment( minEnrollmentLocator );
    }

    async getColumnTextList(columnName) {
        const rowElements = new TableRowElements(this.tableRows);
        return await rowElements[columnName].visible().allInnerTexts();
    }
}

class TableRowElements {

    constructor( tableRowLocator ) {
        this.rowId = tableRowLocator.locator('td[data-col="id"]');
        this.rowCourse = tableRowLocator.locator('td[data-col="course"]');
        this.rowLanguage = tableRowLocator.locator('td[data-col="language"]');
        this.rowLevel = tableRowLocator.locator('td[data-col="level"]');
        this.rowEnrollment = tableRowLocator.locator('td[data-col="enrollments"]');
        this.rowLink = tableRowLocator.locator('td[data-col="link"]');
    }
}

class SelectMinEnrollment {

    constructor( minEnrollmentLocator ) {
        this.any = minEnrollmentLocator.locator('li[data-value="any"]');
        this.fiveThousand = minEnrollmentLocator.locator('li[data-value="5000"]');
        this.tenThousand = minEnrollmentLocator.locator('li[data-value="10000"]');
        this.fiftyThousand = minEnrollmentLocator.locator('li[data-value="50000"]');
    }
}