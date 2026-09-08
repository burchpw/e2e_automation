import { test, expect } from '@playwright/test';
import { user_name, password } from '../helpers/log_in_helper.js';
import { LoginPage } from '../page_objects/login_page.js';
import { LogoutPage } from '../page_objects/logout_page.js';

test('logs the user in', async ({ page }) => { 
    const login_page = new LoginPage(page);
    const logout_page = new LogoutPage(page);

    await login_page.goto();

    await login_page.user_name_field().fill(user_name());
    await login_page.password_field().fill(password());
    await login_page.submit_button().click();

    await expect(logout_page.log_out_button()).toBeVisible();
});

test('handles incorrect user_name', async ({ page }) => { 
    const login_page = new LoginPage(page);

    await login_page.goto();

    await login_page.user_name_field().fill("incorrectUser");
    await login_page.password_field().fill(password());
    await login_page.submit_button().click();

    await expect(login_page.error_message()).toHaveText('Your username is invalid!')
});

test('handles incorrect password', async ({ page }) => { 
    const login_page = new LoginPage(page);

    await login_page.goto();
    
    await login_page.user_name_field().fill(user_name());
    await login_page.password_field().fill('incorrectPassword');
    await login_page.submit_button().click();

    await expect(login_page.error_message()).toHaveText('Your password is invalid!')
});

test('handles blank form submission', async ({ page }) => { 
    const login_page = new LoginPage(page);

    await login_page.goto();

    await login_page.submit_button().click();
    await expect(login_page.error_message()).toHaveText('Your username is invalid!')
});