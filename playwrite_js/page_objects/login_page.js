export class LoginPage {
   /**
   * @param {import('@playwright/test').Page} page
   */

    constructor( page ) {
        this.page = page;
    };

    goto() {
        return this.page.goto('practice-test-login');
    }
    
    user_name_field() {
        return this.page.getByLabel('Username');
    }

    password_field() {
        return this.page.getByLabel('Password');
    }

    submit_button() {
        return this.page.getByRole('button', { name: 'Submit' });
    }

    error_message() {
        return this.page.locator('div#error');
    }
}