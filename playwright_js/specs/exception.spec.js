import { test as baseTest, expect } from '@playwright/test';
import { ExceptionPage } from '../page_objects/exception_page.js';

// Fixture to load page object
const test = baseTest.extend({
    exceptionPage: async( { page }, use) => {
         const exception_page = new ExceptionPage(page);
         await use(exception_page);
    }
});

test.describe('Exception Page', () => {

    test('handles adding row', async ({ exceptionPage }) => {
        await exceptionPage.goto();
        // Not assigning to const since its used once
        await exceptionPage.row('1').add_button.click();
        
        await expect(exceptionPage.confirmation_message()).toHaveText('Row 2 was added');
    });

    test('handles removing row', async ({ exceptionPage }) => {
        const first_row = exceptionPage.row('1');
        const second_row = exceptionPage.row('2');
        
        await exceptionPage.goto();

        await first_row.add_button.click();

        await expect(exceptionPage.confirmation_message()).toHaveText('Row 2 was added');

        await second_row.remove_button.click();

        await expect(exceptionPage.confirmation_message()).toHaveText('Row 2 was removed');
    });

    test('saves text to added row', async ({ exceptionPage }) => {
        const test_text = 'Test Adding Row';
        const first_row = exceptionPage.row('1');
        const second_row = exceptionPage.row('2');
        
        await exceptionPage.goto();

        await first_row.add_button.click();

        await expect(exceptionPage.confirmation_message()).toHaveText('Row 2 was added');

        await second_row.text_field.fill(test_text);

        await second_row.save_button.click();

        await expect(exceptionPage.confirmation_message()).toHaveText('Row 2 was saved');

        await expect(second_row.text_field).toHaveValue(test_text);
    });

    test('updates text on first row', async ({ exceptionPage }) => {
        const test_text = 'Test Updating Text';
        const first_row = exceptionPage.row('1');

        await exceptionPage.goto();

        await first_row.edit_button.click();

        await expect(first_row.save_button).toBeVisible();

        await first_row.text_field.fill(test_text);

        await first_row.save_button.click();

        await expect(exceptionPage.confirmation_message()).toHaveText('Row 1 was saved');

        await expect(first_row.text_field).toHaveValue(test_text);
    });
  
     test('instructions removed when adding row', async ({ exceptionPage }) => {
        const first_row = exceptionPage.row('1');
        
        await exceptionPage.goto();

        await expect(exceptionPage.instructions_text()).toHaveText('Push “Add” button to add another row');

        await first_row.add_button.click();
        
        await expect(exceptionPage.confirmation_message()).toHaveText('Row 2 was added');

        await expect(exceptionPage.instructions_text()).toHaveCount(0);
    });
});