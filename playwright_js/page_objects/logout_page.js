export class LogoutPage {
   /**
   * @param {import('@playwright/test').Page} page
   */

   constructor( page ) {
        this.page = page;
    }

    log_out_button() {
        return this.page.getByRole('link', { name: 'Log out' });
    }
}