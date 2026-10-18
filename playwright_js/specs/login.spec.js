import { test as baseTest, expect } from '@playwright/test';
import { LogInHelper } from '../helpers/log_in_helper.js';
import { LoginPage } from '../page_objects/login_page.js';
import { LogoutPage } from '../page_objects/logout_page.js';

// Fixture to handle loading credentials and load page objects
const test = baseTest.extend({
    credentials: async ( { }, use) => {
        const loginCredentials = new LogInHelper();
        await loginCredentials.init();
        await use(loginCredentials);
    },
    loginPage: async ( { page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    logoutPage: async ( { page }, use ) => {
        const logoutPage = new LogoutPage(page);
        await use(logoutPage);
    }
});

test.describe('Login Page', () => {

    test('logs the user in', async ({ credentials, loginPage, logoutPage }) => { 
        await loginPage.goto();

        await loginPage.userNameField().fill(credentials.userName());
        await loginPage.passwordField().fill(credentials.password());
        await loginPage.submitButton().click();

        await expect(logoutPage.logOutButton()).toBeVisible();
    });

    test('handles incorrect user_name', async ({ credentials, loginPage }) => { 
        await loginPage.goto();

        await loginPage.userNameField().fill("incorrectUser");
        await loginPage.passwordField().fill(credentials.password());
        await loginPage.submitButton().click();

        await expect(loginPage.errorMessage()).toHaveText('Your username is invalid!')
    });

    test('handles incorrect password', async ({ credentials, loginPage }) => { 
        await loginPage.goto();

        await loginPage.userNameField().fill(credentials.userName());
        await loginPage.passwordField().fill('incorrectPassword');
        await loginPage.submitButton().click();

        await expect(loginPage.errorMessage()).toHaveText('Your password is invalid!')
    });

    test('handles blank form submission', async ({ loginPage }) => { 
        await loginPage.goto();

        await loginPage.submitButton().click();
        await expect(loginPage.errorMessage()).toHaveText('Your username is invalid!')
    });
});