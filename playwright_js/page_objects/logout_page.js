export class LogoutPage {
   /**
   * @param {import('@playwright/test').Page} page
   */

   constructor( page ) {
        this.page = page;
    }

    logOutButton() {
        return this.page.getByRole('link', { name: 'Log out' });
    }
}