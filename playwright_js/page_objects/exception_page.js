export class ExceptionPage {
    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor( page ) {
        this.page = page;
    }

    goto() {
        return this.page.goto('practice-test-exceptions');
    }

    add_button() {
        return this.page.getByRole('button', { name: 'Add' });
    }

}