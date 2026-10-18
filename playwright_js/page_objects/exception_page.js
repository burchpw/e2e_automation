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

    confirmationMessage() {
        return this.page.locator('#confirmation');
    }

    instructionsText() {
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
        this.addButton = rowLocator.locator('#add_btn');
        this.removeButton = rowLocator.locator('#remove_btn');
        this.saveButton = rowLocator.locator('#save_btn');
        this.editButton = rowLocator.locator('#edit_btn');
        this.textField = rowLocator.locator('input[type="text"]');
    }  
}