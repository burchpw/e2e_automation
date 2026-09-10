import { test as baseTest, expect } from '@playwright/test';
import { LogInHelper } from '../helpers/log_in_helper.js';
import { LoginPage } from '../page_objects/login_page.js';
import { LogoutPage } from '../page_objects/logout_page.js';

// Fixture to handle loading credentials and load page objects
const test = baseTest.extend({
    credentials: async ( { }, use) => {
        const login_credentials = new LogInHelper();
        await login_credentials.init();
        await use(login_credentials);
    },
    loginPage: async ( { page }, use) => {
        const login_page = new LoginPage(page);
        await use(login_page);
    },
    logoutPage: async ( { page }, use ) => {
        const logout_page = new LogoutPage(page);
        await use(logout_page);
    }
});

test.describe('Login Page', () => {

    test('logs the user in', async ({ credentials, loginPage, logoutPage }) => { 
        await loginPage.goto();

        await loginPage.user_name_field().fill(credentials.user_name());
        await loginPage.password_field().fill(credentials.password());
        await loginPage.submit_button().click();

        await expect(logoutPage.log_out_button()).toBeVisible();
    });

    test('handles incorrect user_name', async ({ credentials, loginPage }) => { 
        await loginPage.goto();

        await loginPage.user_name_field().fill("incorrectUser");
        await loginPage.password_field().fill(credentials.password());
        await loginPage.submit_button().click();

        await expect(loginPage.error_message()).toHaveText('Your username is invalid!')
    });

    test('handles incorrect password', async ({ credentials, loginPage }) => { 
        await loginPage.goto();

        await loginPage.user_name_field().fill(credentials.user_name());
        await loginPage.password_field().fill('incorrectPassword');
        await loginPage.submit_button().click();

        await expect(loginPage.error_message()).toHaveText('Your password is invalid!')
    });

    test('handles blank form submission', async ({ loginPage }) => { 
        await loginPage.goto();

        await loginPage.submit_button().click();
        await expect(loginPage.error_message()).toHaveText('Your username is invalid!')
    });
});