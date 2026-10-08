export class ExceptionPage {
    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor( page ) {
        this.page = page;
        this.rows = page.locator('#rows');
    }

    goto() {
        return this.page.goto('practice-test-exceptions');
    }

    confirmation_message() {
        return this.page.locator('#confirmation');
    }

    instructions_text() {
        return this.page.locator('#instructions');
    }

    row( number ){
        const rowLocator = this.rows.locator(`[id="row${number}"]`);
        return new RowElements( rowLocator );
    }
}

class RowElements {
    
    constructor( rowLocator ) {
        this.row = rowLocator;
        this.add_button = rowLocator.locator('#add_btn');
        this.remove_button = rowLocator.locator('#remove_btn');
        this.save_button = rowLocator.locator('#save_btn');
        this.edit_button = rowLocator.locator('#edit_btn');
        this.text_field = rowLocator.locator('input[type="text"]');
    }  
}