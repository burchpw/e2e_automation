export class LoginPage {
   /**
   * @param {import('@playwright/test').Page} page
   */

    constructor( page ) {
        this.page = page;
    }

    goto() {
        return this.page.goto('practice-test-login');
    }
    
    userNameField() {
        return this.page.getByLabel('Username');
    }

    passwordField() {
        return this.page.getByLabel('Password');
    }

    submitButton() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    errorMessage() {
        return this.page.locator('div#error');
    }
}